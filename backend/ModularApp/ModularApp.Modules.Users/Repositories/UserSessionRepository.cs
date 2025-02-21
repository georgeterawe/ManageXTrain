// ModularApp.Modules.Users.Repositories/UserSessionRepository.cs
using MongoDB.Driver;
using ModularApp.Modules.Users.Interfaces;
using ModularApp.Modules.Users.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson; // Add this namespace

namespace ModularApp.Modules.Users.Repositories
{
    public class UserSessionRepository : IUserSessionRepository
    {
        private readonly IMongoCollection<UserSession> _sessions;
        private readonly IMongoCollection<User> _users;

        public UserSessionRepository(IMongoDatabase database)
        {
            _sessions = database.GetCollection<UserSession>("UserSessions");
            _users = database.GetCollection<User>("Users");
        }

        public async Task CreateSessionAsync(UserSession session)
        {
            await _sessions.InsertOneAsync(session);
        }

        public async Task EndSessionAsync(string sessionId)
        {
            var update = Builders<UserSession>.Update
                .Set(s => s.LogoutTime, DateTime.UtcNow)
                .Set(s => s.IsActive, false);

            await _sessions.UpdateOneAsync(s => s.Id == sessionId, update);
        }

        public async Task<UserSession> GetSessionByIdAsync(string sessionId)
        {
            return await _sessions.Find(s => s.Id == sessionId).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<UserSession>> GetUserSessionsAsync(string userId)
        {
            return await _sessions.Find(s => s.UserId == userId).ToListAsync();
        }

        public async Task<IDictionary<string, int>> GetLoginCountsAsync()
        {
            var pipeline = new BsonDocument[]
            {
                new BsonDocument("$group", new BsonDocument
                {
                    { "_id", "$UserId" },
                    { "loginCount", new BsonDocument("$sum", 1) }
                })
            };

            var results = await _sessions.Aggregate<BsonDocument>(
                PipelineDefinition<UserSession, BsonDocument>.Create(pipeline)).ToListAsync();

            var userIds = results.Select(r => r["_id"].AsString).ToList();

            // Get user details for the IDs
            var users = await _users.Find(u => userIds.Contains(u.Id)).ToListAsync();
            var userMap = users.ToDictionary(u => u.Id, u => u.Username);

            return results.ToDictionary(
                r => userMap.GetValueOrDefault(r["_id"].AsString, r["_id"].AsString),
                r => r["loginCount"].AsInt32
            );
        }

        public async Task<IDictionary<string, double>> GetAverageSessionDurationsAsync()
        {
            var pipeline = new BsonDocument[]
            {
                new BsonDocument("$match", new BsonDocument
                {
                    { "LogoutTime", new BsonDocument("$ne", BsonNull.Value) }
                }),
                new BsonDocument("$group", new BsonDocument
                {
                    { "_id", "$UserId" },
                    { "avgDurationMinutes", new BsonDocument("$avg",
                        new BsonDocument("$divide", new BsonArray
                        {
                            new BsonDocument("$subtract", new BsonArray
                            {
                                "$LogoutTime",
                                "$LoginTime"
                            }),
                            60000 // Convert milliseconds to minutes
                        })
                    )}
                })
            };

            var results = await _sessions.Aggregate<BsonDocument>(
                PipelineDefinition<UserSession, BsonDocument>.Create(pipeline)).ToListAsync();

            var userIds = results.Select(r => r["_id"].AsString).ToList();

            // Get user details for the IDs
            var users = await _users.Find(u => userIds.Contains(u.Id)).ToListAsync();
            var userMap = users.ToDictionary(u => u.Id, u => u.Username);

            return results.ToDictionary(
                r => userMap.GetValueOrDefault(r["_id"].AsString, r["_id"].AsString),
                r => Math.Round(r["avgDurationMinutes"].AsDouble, 2)
            );
        }
    }
}