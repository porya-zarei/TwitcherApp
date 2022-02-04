namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class MainController : ControllerBase
{
    private readonly ILogger<MainController> _logger;
    public MainController(ILogger<MainController> logger)
    {
        _logger = logger;
    }
}
