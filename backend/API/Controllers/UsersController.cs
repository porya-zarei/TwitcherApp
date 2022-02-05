namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UsersController : ControllerBase
{
    private readonly IMediator _mediator;
    private readonly JwtConfig _jwtConfig;

    public UsersController(IMediator mediator, IOptionsMonitor<JwtConfig> monitor)
    {

        _mediator = mediator;
        _jwtConfig = monitor.CurrentValue;
    }

    [HttpGet("GetAllUsers")]
    public async Task<ActionResult<APIResult<List<User>>>> GetAllUsers()
    {
        var res = await _mediator.Send(new GetUsersQuery());
        var result = new APIResult<List<OutUser>>
        {
           Result = res,
           Status = 200,
        };
        return Ok(result);
    }
}
