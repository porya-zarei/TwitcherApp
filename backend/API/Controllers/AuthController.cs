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
    public async Task<ActionResult<APIResult<OutUserWithToken?>>> RegisterUser(RegisterUser registerUser)
    {
        try
        {
            var res = await _mediator.Send(new RegisterUserCommand { RegisterUser = registerUser });

            var pairs = new Dictionary<string, string>
            {
                { "UserName", res?.UserName ?? "" },
                { "FullName", $"{res?.FirstName} {res?.LastName}" }
            };

            var token = JwtHelper.GetToken(pairs, _jwtConfig);

            if (res != null) res.Token = token;

            var result = new APIResult<OutUserWithToken?>
            {
                Result = res,
                Status = 201,
                Message = "Created Successfuly"
            };

            Response.Cookies.Append(GlobalConfigs.TokenKey, token);

            return Created("api/Auth/RegisterUser", result);
        }
        catch (Exception err)
        {
            var result = new APIResult<OutUserWithToken?>
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
    public async Task<ActionResult<APIResult<OutUserWithToken?>>> LoginUser(LoginUser loginUser)
    {
        try
        {
            var res = await _mediator.Send(new LoginUserCommand { LoginUser = loginUser });
            
            var pairs = new Dictionary<string, string>
            {
                { "UserName", res?.UserName ?? "" },
                { "FullName", $"{res?.FirstName} {res?.LastName}" }
            };

            var token = JwtHelper.GetToken(pairs, _jwtConfig);
            if (res!=null) res.Token = token;
            var result = new APIResult<OutUserWithToken?>
            {
                Result = res,
                Status = 200,
                Message = "LogedIn Successfuly"
            };

            Response.Cookies.Append(GlobalConfigs.TokenKey, token,JwtHelper.GetCookieOptions());

            return Ok(result);
        }
        catch (Exception err)
        {
            var result = new APIResult<OutUserWithToken?>
            {
                Status = 400,
                Ok = false,
                Message = err.Message,
                Errors = err.Data.Values.Cast<string>().ToList()
            };
            return BadRequest(result);
        }
    }
    [HttpGet("LoginWithToken")]
    public async Task<ActionResult<APIResult<OutUserWithToken?>>> LoginUserWithToken()
    {
        try
        {
            var userName = User.FindFirst("UserName")?.Value ?? "";
            var res = await _mediator.Send(new LoginUserWithTokenCommand { UserName = userName });

            var pairs = new Dictionary<string, string>
            {
                { "UserName", res?.UserName ?? "" },
                { "FullName", $"{res?.FirstName} {res?.LastName}" }
            };

            var token = JwtHelper.GetToken(pairs, _jwtConfig);
            if (res != null) res.Token = token;
            var result = new APIResult<OutUserWithToken?>
            {
                Result = res,
                Status = 200,
                Message = "LogedIn Successfuly"
            };

            Response.Cookies.Append(GlobalConfigs.TokenKey, token, JwtHelper.GetCookieOptions());

            return Ok(result);
        }
        catch (Exception err)
        {
            var result = new APIResult<OutUserWithToken?>
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
