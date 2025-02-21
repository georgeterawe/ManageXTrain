// ModularApp.Modules.Users.Services/UserSessionService.cs
using ModularApp.Modules.Users.Interfaces;
using ModularApp.Modules.Users.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Driver;

namespace ModularApp.Modules.Users.Services
{
    public class UserSessionService : IUserSessionService
    {
        private readonly IUserSessionRepository _sessionRepository;
        private readonly IMongoCollection<UserSession> _sessions;

        public UserSessionService(IUserSessionRepository sessionRepository, IMongoDatabase database)
        {
            _sessionRepository = sessionRepository;
            _sessions = database.GetCollection<UserSession>("UserSessions");
        }

        public async Task<string> StartSessionAsync(string userId, string ipAddress, string userAgent)
        {
            var session = new UserSession
            {
                UserId = userId,
                LoginTime = DateTime.UtcNow,
                IpAddress = ipAddress,
                UserAgent = userAgent,
                IsActive = true
            };

            await _sessionRepository.CreateSessionAsync(session);
            return session.Id;
        }

        public async Task EndSessionAsync(string sessionId)
        {
            await _sessionRepository.EndSessionAsync(sessionId);
        }

        public async Task EndAllUserSessionsAsync(string userId)
        {
            var update = Builders<UserSession>.Update
                .Set(s => s.LogoutTime, DateTime.UtcNow)
                .Set(s => s.IsActive, false);

            await _sessions.UpdateManyAsync(
                s => s.UserId == userId && s.IsActive,
                update
            );
        }

        public async Task<IDictionary<string, int>> GetLoginCountsAsync()
        {
            return await _sessionRepository.GetLoginCountsAsync();
        }

        public async Task<IDictionary<string, double>> GetAverageSessionDurationsAsync()
        {
            return await _sessionRepository.GetAverageSessionDurationsAsync();
        }

        public async Task<UserSessionStats> GetUserSessionStatsAsync()
        {
            var today = DateTime.UtcNow.Date;

            var loginCounts = await GetLoginCountsAsync();
            var avgDurations = await GetAverageSessionDurationsAsync();

            var activeSessions = await _sessions.CountDocumentsAsync(s => s.IsActive);
            var todaySessions = await _sessions.CountDocumentsAsync(
                s => s.LoginTime >= today && s.LoginTime < today.AddDays(1)
            );

            return new UserSessionStats
            {
                LoginCounts = loginCounts,
                AverageSessionMinutes = avgDurations,
                TotalActiveSessions = (int)activeSessions,
                TotalSessionsToday = (int)todaySessions
            };
        }
    }
}