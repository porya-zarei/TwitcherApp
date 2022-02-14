namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TweetsController : ControllerBase
{
    private readonly IMediator _mediator;

    public TweetsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost("Create")]
    [Authorize]
    public async Task<ActionResult<APIResult<OutTweet>>> CreateTweet([FromForm]CreateTweet createTweet)
    {
        var result = await _mediator.Send(new CreateTweetCommand { CreateTweet = createTweet });
        if (result.Ok)
            return Created("api/Tweets/Create", result);
        return BadRequest(result);
    }

    [HttpGet("GetFeed/{userName}")]
    [Authorize]
    public async Task<ActionResult<APIResult<List<OutTweet>>>> GetUserFeed(string userName,[FromQuery]int itemsPerPage,[FromQuery]int pageNumber)
    {
        var result = await _mediator.Send(new GetUserFeedTweetsQuery { UserName = userName, ItemsPerPage = itemsPerPage, PageNumber = pageNumber });
        if (result.Ok) return Ok(result);
        return BadRequest(result);
    }

    [HttpGet("GetFullTweet/{tweetId}")]
    [Authorize]
    public async Task<ActionResult<FullOutTweet?>> GetFullTweet(Guid tweetId)
    {
        var result = await _mediator.Send(new GetFullTweetQuery { TweetId = tweetId });
        if (result.Ok) return Ok(result);
        return BadRequest(result);
    }
}
