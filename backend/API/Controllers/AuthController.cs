namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly IMediator _mediator;
    private readonly JwtConfig _jwtConfig;

    public AuthController(IMediator mediator,IOptionsMonitor<JwtConfig> monitor)
    {
        _mediator = mediator;
        _jwtConfig = monitor.CurrentValue;
    }

    [HttpPost("Register")]
    public async Task<ActionResult<APIResult<User>>> RegisterUser(RegisterUser registerUser)
    {
        try
        {
            var res = await _mediator.Send(new RegisterUserCommand { RegisterUser = registerUser });
            var result = new APIResult<OutUser>
            {
                Result = res,
                Status = 201,
                Message = "Created Successfuly"
            };

            var pairs = new Dictionary<string, string>
            {
                { "UserName", res?.UserName ?? "" },
                { "FullName", res?.FullName ?? "" }
            };

            var token = JwtHelper.GetToken(pairs, _jwtConfig);

            Response.Cookies.Append(GlobalConfigs.TokenKey, token);
            return Created("api/Auth/RegisterUser", result);
        }
        catch (Exception err)
        {
            var result = new APIResult<User>
            {
                Status = 400,
                Ok = false,
                Message = err.Message,
                Errors = err.Data.Values.Cast<string>().ToList()
            };
            return BadRequest(result);
        }
    }

    [HttpPost("Login")]
    public async Task<ActionResult<APIResult<User>>> LoginUser(LoginUser loginUser)
    {
        try
        {
            var res = await _mediator.Send(new LoginUserCommand { LoginUser = loginUser });

            var result = new APIResult<OutUser>
            {
                Result = res,
                Status = 200,
                Message = "LogedIn Successfuly"
            };

            var pairs = new Dictionary<string, string>
            {
                { "UserName", res?.UserName ?? "" },
                { "FullName", res?.FullName ?? "" }
            };

            var token = JwtHelper.GetToken(pairs, _jwtConfig);
            
            Response.Cookies.Append(GlobalConfigs.TokenKey, token,JwtHelper.GetCookieOptions());

            return Ok(result);
        }
        catch (Exception err)
        {
            var result = new APIResult<User>
            {
                Status = 400,
                Ok = false,
                Message = err.Message,
                Errors = err.Data.Values.Cast<string>().ToList()
            };
            return BadRequest(result);
        }
    }
}
