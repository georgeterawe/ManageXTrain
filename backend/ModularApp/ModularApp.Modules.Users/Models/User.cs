using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ModularApp.Modules.Users.Models;

public class User
{
    [BsonId] // Marks this property as the primary key
    [BsonRepresentation(BsonType.ObjectId)] // Maps the Id to MongoDB's ObjectId
    public string? Id { get; set; } // Nullable, MongoDB will generate this

    public string Username { get; set; }
    public string Email { get; set; }
    public string PasswordHash { get; set; }
    public string Title { get; set; }

    public string? ResetToken { get; set; }
    public DateTime? ResetTokenExpiration { get; set; }
}