// ModularApp.Modules.Email/Services/EmailService.cs
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using ModularApp.Modules.Email.Interfaces;
using ModularApp.Modules.Email.Models;
using System.Threading.Tasks;

namespace ModularApp.Modules.Email.Services
{
    public class EmailService : IEmailService
    {
        private readonly EmailConfig _emailConfig;

        public EmailService(IOptions<EmailConfig> emailConfig)
        {
            _emailConfig = emailConfig.Value;
        }

        public async Task<bool> SendPasswordResetEmailAsync(string email, string resetToken)
        {
            try
            {
                Console.WriteLine($"Sending password reset email to {email}...");
                var message = new MimeMessage();
                message.From.Add(new MailboxAddress(_emailConfig.SenderName, _emailConfig.SenderEmail));
                message.To.Add(new MailboxAddress("", email));
                message.Subject = "Password Reset Request";

                var resetUrl = $"{_emailConfig.ResetPasswordUrl}?token={resetToken}";

                var bodyBuilder = new BodyBuilder
                {
                    HtmlBody = $@"
                <h2>Password Reset</h2>
                <p>You requested a password reset. Please click the link below to reset your password:</p>
                <p><a href='{resetUrl}'>Reset Password</a></p>
                <p>If you didn't request a password reset, please ignore this email.</p>
                <p>This link will expire in 24 hours.</p>
            ",
                    TextBody = $"Password Reset\n\nYou requested a password reset. Please visit the following link to reset your password: {resetUrl}\n\nIf you didn't request a password reset, please ignore this email.\n\nThis link will expire in 24 hours."
                };

                message.Body = bodyBuilder.ToMessageBody();

                using var client = new SmtpClient();
                await client.ConnectAsync(
                    _emailConfig.SmtpServer,
                    _emailConfig.Port,
                    _emailConfig.UseSsl ? SecureSocketOptions.SslOnConnect : SecureSocketOptions.StartTls);

                await client.AuthenticateAsync(_emailConfig.Username, _emailConfig.Password);

                // ✅ If SendAsync executes successfully, email was sent
                await client.SendAsync(message);

                await client.DisconnectAsync(true);

                Console.WriteLine($"✅ Email sent successfully to {email}.");
                return true; // ✅ Indicate success
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ Failed to send email to {email}. Error: {ex.Message}");
                return false; // ❌ Indicate failure
            }
        }

    }
}