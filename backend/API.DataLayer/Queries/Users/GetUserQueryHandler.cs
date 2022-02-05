namespace API.DataLayer.Queries.Users;

public class GetUserQuery : IRequest<OutUser>
{
    public Guid UserId { get; set; }
}


public class GetUserQueryHandler : IRequestHandler<GetUserQuery, OutUser>
{
    private readonly IUserRepository _userRepository;
    public GetUserQueryHandler(MainContext context)
    {
        _userRepository = new UserRepository(context);
    }
    public Task<OutUser> Handle(GetUserQuery request, CancellationToken cancellationToken)
    {
        var user = _userRepository.GetEntry(request.UserId);
        var result = OutUser.MapToOutUser(user??new User());
        return Task.FromResult(result);
    }
}
