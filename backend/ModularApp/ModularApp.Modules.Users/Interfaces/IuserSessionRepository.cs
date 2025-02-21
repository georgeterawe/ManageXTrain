// ModularApp.Modules.Users.Interfaces/IUserSessionRepository.cs
using ModularApp.Modules.Users.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ModularApp.Modules.Users.Interfaces
{
    public interface IUserSessionRepository
    {
        Task CreateSessionAsync(UserSession session);
        Task EndSessionAsync(string sessionId);
        Task<UserSession> GetSessionByIdAsync(string sessionId);
        Task<IEnumerable<UserSession>> GetUserSessionsAsync(string userId);
        Task<IDictionary<string, int>> GetLoginCountsAsync();
        Task<IDictionary<string, double>> GetAverageSessionDurationsAsync();
    }
}