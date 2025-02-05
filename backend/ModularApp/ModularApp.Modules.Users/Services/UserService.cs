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
    public async Task<string> GeneratePasswordResetTokenAsync(string email)
    {
        var user = await _userRepository.GetUserByEmailAsync(email);
        if (user == null)
            return null;

        // Generate a secure token
        string resetToken = Convert.ToBase64String(System.Security.Cryptography.RandomNumberGenerator.GetBytes(32));

        // Set token and expiration
        user.ResetToken = resetToken;
        user.ResetTokenExpiration = DateTime.UtcNow.AddHours(1);

        await _userRepository.UpdateUserAsync(user);

        return resetToken;
    }

    public async Task ResetPasswordAsync(string token, string newPassword)
    {
        var user = await _userRepository.GetUserByResetTokenAsync(token);

        if (user == null)
            throw new InvalidOperationException("Invalid or expired reset token");

        // Update password
        user.PasswordHash = HashPassword(newPassword);

        // Clear reset token
        user.ResetToken = null;
        user.ResetTokenExpiration = null;

        await _userRepository.UpdateUserAsync(user);
    }
    public async Task<User> FindByEmailAsync(string email)
    {
        return await _userRepository.GetUserByEmailAsync(email);
    }

    public async Task SaveResetTokenAsync(string userId, string resetToken)
    {
        var user = await _userRepository.GetUserByIdAsync(userId);
        user.ResetToken = resetToken;
        user.ResetTokenExpiration = DateTime.UtcNow.AddHours(1);
        await _userRepository.UpdateUserAsync(user);
    }

    public async Task<User> ValidateResetTokenAsync(string token)
    {
        return await _userRepository.GetUserByResetTokenAsync(token);
    }

    public async Task UpdatePasswordAsync(string userId, string newPassword)
    {
        var user = await _userRepository.GetUserByIdAsync(userId);
        user.PasswordHash = HashPassword(newPassword);
        user.ResetToken = null;
        user.ResetTokenExpiration = null;
        await _userRepository.UpdateUserAsync(user);
    }

    public async Task<IEnumerable<User>> GetPaginatedUsersAsync(int page, int limit)
    {
        return await _userRepository.GetUsersPaginatedAsync(page, limit);
    }

    public async Task<long> GetTotalUserCountAsync()
    {
        return await _userRepository.GetTotalUsersAsync();
    }

}
