// ModularApp.Modules.Email/Models/EmailConfig.cs
namespace ModularApp.Modules.Email.Models
{
    public class EmailConfig
    {
        public string SmtpServer { get; set; }
        public int Port { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string SenderEmail { get; set; }
        public string SenderName { get; set; }
        public bool UseSsl { get; set; }
        public string ResetPasswordUrl { get; set; }
    }
}