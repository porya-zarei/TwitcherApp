namespace API.DataLayer.Commands.Auth;

public class LoginUserCommand : IRequest<OutUser?>
{
    public LoginUser LoginUser { get; set; }
}

public class LoginCommandHandler : IRequestHandler<LoginUserCommand, OutUser?>
{
    private readonly IUserRepository _userRepository;
    public LoginCommandHandler(MainContext context)
    {
        _userRepository = new UserRepository(context);
    }
    public async Task<OutUser?> Handle(LoginUserCommand request, CancellationToken cancellationToken)
    {
        var res = await _userRepository.AuthenticateUser(request.LoginUser);
        return OutUser.MapToOutUser(res);
    }
}
