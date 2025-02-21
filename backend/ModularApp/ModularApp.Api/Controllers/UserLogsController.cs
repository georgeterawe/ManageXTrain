// ModularApp.Api.Controllers/UserLogsController.cs
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ModularApp.Modules.Users.Interfaces;
using System.Threading.Tasks;

namespace ModularApp.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class UserLogsController : ControllerBase
    {
        private readonly IUserSessionService _sessionService;

        public UserLogsController(IUserSessionService sessionService)
        {
            _sessionService = sessionService;
        }

        [HttpGet("stats")]
        public async Task<IActionResult> GetSessionStats()
        {
            var stats = await _sessionService.GetUserSessionStatsAsync();
            return Ok(stats);
        }

        [HttpGet("login-counts")]
        public async Task<IActionResult> GetLoginCounts()
        {
            var counts = await _sessionService.GetLoginCountsAsync();
            return Ok(counts);
        }

        [HttpGet("session-durations")]
        public async Task<IActionResult> GetSessionDurations()
        {
            var durations = await _sessionService.GetAverageSessionDurationsAsync();
            return Ok(durations);
        }
    }
}