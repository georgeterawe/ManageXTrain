using ModularApp.Modules.Users.Models;
using System.Threading.Tasks;

namespace ModularApp.Modules.Users.Interfaces;

public interface IUserService
{
    Task<User> RegisterUserAsync(User user);
    Task<User> AuthenticateUserAsync(string username, string password);
    Task<string> GeneratePasswordResetTokenAsync(string email);
    Task ResetPasswordAsync(string token, string newPassword);
    Task<User> FindByEmailAsync(string email);
    Task SaveResetTokenAsync(string userId, string resetToken);
    Task<User> ValidateResetTokenAsync(string token);
    Task UpdatePasswordAsync(string userId, string newPassword);

    // Task<IEnumerable<User>> AllUsersAsync();

    Task<IEnumerable<User>> GetPaginatedUsersAsync(int page, int limit);
    Task<long> GetTotalUserCountAsync();

}