namespace API.DataLayer.Commands.Users;

public class FollowingUserCommand : IRequest<APIResult<bool>>
{
    public string FollowingUserName { get; set; } = "";
    public string FollowerUserName { get; set; } = "";
}

public class FollowingUserCommandHandler : IRequestHandler<FollowingUserCommand, APIResult<bool>>
{
    private readonly IUsersRepository _usersRepository;
    public FollowingUserCommandHandler(MainContext context)
    {
        _usersRepository = new UsersRepository(context);
    }
    public async Task<APIResult<bool>> Handle(FollowingUserCommand request, CancellationToken cancellationToken)
    {
        APIResult<bool> result;
        try
        {
            var res = await _usersRepository.FollowingUser(request.FollowerUserName, request.FollowingUserName);
            if (res)
            {
                result = new()
                {
                    Result = true,
                    Status = 201,
                };
            }
            else
            {
                result = new()
                {
                    Status = 400,
                    Result = false,
                    Ok = false,
                    Message = "userNames are not valid"
                };
            }
        }
        catch (Exception error)
        {
            result = new()
            {
                Message = error.Message,
                Ok = false,
                Result = false,
                Status = 400,
                Errors = new List<string> { error.InnerException?.Message ?? "" }
            };
        }
        return result;
    }
}
