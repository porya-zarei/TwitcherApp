namespace API.DataLayer.Commands.Auth;

public class LoginUserCommand : IRequest<OutUserWithToken?>
{
    public LoginUser LoginUser { get; set; }
}

public class LoginCommandHandler : IRequestHandler<LoginUserCommand, OutUserWithToken?>
{
    private readonly IUsersRepository _userRepository;
    public LoginCommandHandler(MainContext context)
    {
        _userRepository = new UsersRepository(context);
    }
    public async Task<OutUserWithToken?> Handle(LoginUserCommand request, CancellationToken cancellationToken)
    {
        var res = await _userRepository.AuthenticateUser(request.LoginUser);
        return OutUserWithToken.MapToOutUserWithToken(res);
    }
}
