using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using ModularApp.Modules.Users.Interfaces;
using ModularApp.Modules.Users.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.Json;

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
}
