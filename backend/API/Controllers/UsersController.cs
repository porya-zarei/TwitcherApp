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

    [HttpPost("Follow/{followingUserName}")]
    [Authorize]
    public async Task<ActionResult<APIResult<bool>>> FollowingUser(string followingUserName)
    {
        var followerUserName = User.FindFirst("UserName")?.Value??"";
        var res = await _mediator.Send(new FollowingUserCommand { FollowerUserName = followerUserName , FollowingUserName = followingUserName});
        return res;
    }

    [HttpPost("UnFollow/{followedUserName}")]
    [Authorize]
    public async Task<ActionResult<APIResult<bool>>> UnFollowingUser(string followedUserName)
    {
        var followerUserName = User.FindFirst("UserName")?.Value ?? "";
        var res = await _mediator.Send(new UnFollowingUserCommand { FollowerUserName = followerUserName, FollowedUserName = followedUserName });
        return res;
    }
}
