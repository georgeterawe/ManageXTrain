using ModularApp.Modules.Users.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ModularApp.Modules.Users.Interfaces;

public interface IUserRepository
{
    Task<User> GetUserByIdAsync(string id);

    Task<User> GetUserByUsernameAsync(string username);
    Task<User> GetUserByEmailAsync(string email);
    Task AddUserAsync(User user);
    Task CreateUserAsync(User user);

    Task UpdateUserAsync(User user);
    Task<User> GetUserByResetTokenAsync(string resetToken);

    // Task<IEnumerable<User>> GetUsersAsync();
    Task<IEnumerable<User>> GetUsersPaginatedAsync(int page, int limit);
    Task<long> GetTotalUsersAsync();
}