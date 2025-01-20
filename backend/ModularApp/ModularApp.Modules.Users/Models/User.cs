namespace ModularApp.Modules.Users.Models;

public class User
{
    public string Id { get; set; } // MongoDB uses string for Id
    public string Username { get; set; }
    public string Email { get; set; }
    public string PasswordHash { get; set; }
}