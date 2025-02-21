// ModularApp.Modules.Email/Interfaces/IEmailService.cs
using System.Threading.Tasks;

namespace ModularApp.Modules.Email.Interfaces
{
    public interface IEmailService
    {
        Task<bool> SendPasswordResetEmailAsync(string email, string resetToken);
    }
}