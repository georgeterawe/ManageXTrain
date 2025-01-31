using MongoDB.Driver;
using ModularApp.Modules.Users.Interfaces;
using ModularApp.Modules.Users.Models;
using System.Threading.Tasks;

namespace ModularApp.Modules.Users.Repositories;

public class UserRepository : IUserRepository
{
    private readonly IMongoCollection<User> _users;

    public UserRepository(IMongoDatabase database)
    {
        _users = database.GetCollection<User>("Users");
    }

    public async Task<User> GetUserByIdAsync(string id)
    {
        return await _users.Find(u => u.Id == id).FirstOrDefaultAsync();
    }

    public async Task<User> GetUserByUsernameAsync(string username)
    {
        return await _users.Find(u => u.Username == username).FirstOrDefaultAsync();
    }

    public async Task<User> GetUserByEmailAsync(string email)
    {
        return await _users.Find(u => u.Email == email).FirstOrDefaultAsync();
    }

    public async Task AddUserAsync(User user)
    {
        await _users.InsertOneAsync(user);
    }

    public async Task CreateUserAsync(User user)
    {
        if (await _users.Find(u => u.Username == user.Username || u.Email == user.Email).AnyAsync())
        {
            throw new InvalidOperationException("User with the same username or email already exists.");
        }

        await _users.InsertOneAsync(user);
    }

    public async Task UpdateUserAsync(User user)
    {
        await _users.ReplaceOneAsync(u => u.Id == user.Id, user);
    }

    public async Task<User> GetUserByResetTokenAsync(string resetToken)
    {
        return await _users.Find(u => u.ResetToken == resetToken
            && u.ResetTokenExpiration > DateTime.UtcNow).FirstOrDefaultAsync();
    }
}