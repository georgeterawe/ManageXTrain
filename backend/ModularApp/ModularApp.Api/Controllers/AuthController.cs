using Microsoft.AspNetCore.Mvc;
using ModularApp.Modules.Users.Interfaces;
using ModularApp.Modules.Users.Models;

namespace ModularApp.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IUserService _userService;

    public AuthController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpPost("signup")]
    public async Task<IActionResult> Signup(User user)
    {
        try
        {
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
            var user = await _userService.AuthenticateUserAsync(request.Username, request.Password);

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
        // Placeholder for JWT token generation
        return "dummy-jwt-token";
    }
}

public class LoginRequest
{
    public string Username { get; set; }
    public string Password { get; set; }
}