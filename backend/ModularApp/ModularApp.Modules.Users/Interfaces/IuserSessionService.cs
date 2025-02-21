// ModularApp.Modules.Users.Interfaces/IUserSessionService.cs
using ModularApp.Modules.Users.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ModularApp.Modules.Users.Interfaces
{
    public interface IUserSessionService
    {
        Task<string> StartSessionAsync(string userId, string ipAddress, string userAgent);
        Task EndSessionAsync(string sessionId);
        Task EndAllUserSessionsAsync(string userId);
        Task<IDictionary<string, int>> GetLoginCountsAsync();
        Task<IDictionary<string, double>> GetAverageSessionDurationsAsync();
        Task<UserSessionStats> GetUserSessionStatsAsync();
    }

    public class UserSessionStats
    {
        public IDictionary<string, int> LoginCounts { get; set; }
        public IDictionary<string, double> AverageSessionMinutes { get; set; }
        public int TotalActiveSessions { get; set; }
        public int TotalSessionsToday { get; set; }
    }
}