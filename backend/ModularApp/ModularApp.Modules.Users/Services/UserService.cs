using BCrypt.Net;
using ModularApp.Modules.Users.Interfaces;
using ModularApp.Modules.Users.Models;
using ModularApp.Modules.Users.Repositories;
using System.Threading.Tasks;

namespace ModularApp.Modules.Users.Services;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;

    public UserService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<User> RegisterUserAsync(User user)
    {
        // Hash the password before saving
        user.PasswordHash = HashPassword(user.PasswordHash);

        await _userRepository.CreateUserAsync(user);
        return user;
    }

    public async Task<User> AuthenticateUserAsync(string email, string password)
    {
        var user = await _userRepository.GetUserByEmailAsync(email);

        if (user == null || !VerifyPassword(password, user.PasswordHash))
            return null;

        return user;
    }

    private string HashPassword(string password)
    {
        return BCrypt.Net.BCrypt.HashPassword(password);
    }

    private bool VerifyPassword(string password, string hashedPassword)
    {
        return BCrypt.Net.BCrypt.Verify(password, hashedPassword);
    }
}