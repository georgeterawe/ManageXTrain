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
}