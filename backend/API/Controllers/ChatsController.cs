namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ChatsController : ControllerBase
{

    private readonly IMediator _mediator;

    public ChatsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [Authorize]
    [HttpPost("CreateChat")]
    public async Task<ActionResult<APIResult<bool>>> CreateChat(CreateChat createChat)
    {
        var userName = User.FindFirst("UserName")?.Value ?? "";
        if (userName != createChat.CreatorUserName)
        {
            return BadRequest(new APIResult<bool>
            {
                Result = false,
                Message = "Please use valid username",
                Ok = false
            });
        }
        var result = await _mediator.Send(new CreateChatQuery { CreateChat = createChat });
        return result.Ok ? Ok(result) : BadRequest(result);
    }

    [Authorize]
    [HttpPost("CreateMessage")]
    public async Task<ActionResult<APIResult<bool>>> SendChat([FromForm]CreateMessage createMessage)
    {
        var userName = User.FindFirst("UserName")?.Value ?? "";
        if (userName != createMessage.SenderUserName)
        {
            return BadRequest(new APIResult<bool>
            {
                Result = false,
                Message = "Please use valid username",
                Ok = false
            });
        }
        var result = await _mediator.Send(new CreateMessageCommand { CreateMessage = createMessage });
        return result.Ok ? Ok(result) : BadRequest(result);
    }

    [HttpGet("GetChats/{userName}")]
    [Authorize]
    public async Task<ActionResult<APIResult<List<OutChat>>>> GetUserChats(string userName)
    {
        var userNameFromToken = User.FindFirst("UserName")?.Value ?? "";
        if ( userNameFromToken != userName)
        {
            return BadRequest(new APIResult<List<OutChat>>
            {
                Result = new List<OutChat> { },
                Message = "Please use valid username",
                Ok = false
            });
        }
        var result = await _mediator.Send(new GetChatsQuery { UserName = userName });
        return result.Ok ? Ok(result) : BadRequest(result);
    } 

}
