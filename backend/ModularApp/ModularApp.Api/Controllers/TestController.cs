using Microsoft.AspNetCore.Mvc;

namespace modularapp.api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TestController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(new { Message = "Hello from the TestController!" });
    }
}