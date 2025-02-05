using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using ModularApp.Modules.Users.Interfaces;
using ModularApp.Modules.Users.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.Json;
using System.Security.Cryptography;
using System.ComponentModel.DataAnnotations;

namespace ModularApp.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IConfiguration _configuration;

        public AuthController(IUserService userService, IConfiguration configuration)
        {
            _userService = userService;
            _configuration = configuration;
        }

        [HttpPost("signup")]
        public async Task<IActionResult> Signup([FromBody] User user)
        {
            try
            {
                // Log the incoming user data
                Console.WriteLine($"Received user: {JsonSerializer.Serialize(user)}");

                // Validate the model
                if (!ModelState.IsValid)
                {
                    // Log validation errors
                    foreach (var error in ModelState.Values.SelectMany(v => v.Errors))
                    {
                        Console.WriteLine($"Validation Error: {error.ErrorMessage}");
                    }
                    return BadRequest(ModelState);
                }

                var registeredUser = await _userService.RegisterUserAsync(user);
                return Ok(new { Message = "User registered successfully!", User = registeredUser });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = "Registration failed: " + ex.Message });
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            try
            {
                Console.WriteLine($"Received login request: {JsonSerializer.Serialize(request)}");

                var user = await _userService.AuthenticateUserAsync(request.Email, request.Password);

                if (user == null)
                    return Unauthorized(new { Message = "Invalid username or password" });

                var token = GenerateJwtToken(user);

                return Ok(new { Token = token, User = user });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = "Login failed: " + ex.Message });
            }
        }
        [HttpPost("request-password-reset")]
        public async Task<IActionResult> RequestPasswordReset([FromBody] RequestPasswordResetDto request)
        {
            // 1. Validate email
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // 2. Find user by email
            var user = await _userService.FindByEmailAsync(request.Email);
            if (user == null)
                return Ok(); // Prevent email enumeration

            // 3. Generate reset token
            var resetToken = GenerateResetToken();

            // 4. Save token with expiration
            await _userService.SaveResetTokenAsync(user.Id, resetToken);

            // 5. Send reset email (you'll implement email service)
            // await _emailService.SendPasswordResetEmail(user.Email, resetToken);

            return Ok();
        }

        [HttpGet("user-list")]
        public async Task<IActionResult> GetUserList(int page = 1, int limit = 10)
        {
            if (page < 1 || limit < 1)
            {
                return BadRequest("Page and limit must be greater than 0.");
            }

            var users = await _userService.GetPaginatedUsersAsync(page, limit);
            var totalUsers = await _userService.GetTotalUserCountAsync();

            return Ok(new
            {
                data = users,
                total = totalUsers
            });
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDto request)
        {
            // 1. Validate input
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // 2. Validate token
            var user = await _userService.ValidateResetTokenAsync(request.Token);
            Console.WriteLine(user);
            if (user == null)
                return BadRequest("Invalid or expired token");

            // 3. Update password
            await _userService.UpdatePasswordAsync(user.Id, request.NewPassword);

            return Ok();
        }

        private string GenerateResetToken()
        {
            return Convert.ToBase64String(RandomNumberGenerator.GetBytes(32));
        }

        private string GenerateJwtToken(User user)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"])); // Secret key from configuration
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim("UserId", user.Id.ToString())
            };

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"], // Issuer from configuration
                audience: _configuration["Jwt:Audience"], // Audience from configuration
                claims: claims,
                expires: DateTime.UtcNow.AddHours(1), // Token expiration
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }

    public class LoginRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class RequestPasswordResetDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }

    public class ResetPasswordDto
    {
        [Required]
        public string Token { get; set; }

        [Required]
        [MinLength(8)]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$")]
        public string NewPassword { get; set; }
    }
}
