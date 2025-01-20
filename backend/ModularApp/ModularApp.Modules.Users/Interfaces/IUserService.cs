using ModularApp.Modules.Users.Models;
using System.Threading.Tasks;

namespace ModularApp.Modules.Users.Interfaces;

public interface IUserService
{
    Task<User> RegisterUserAsync(User user);
    Task<User> AuthenticateUserAsync(string username, string password);
}