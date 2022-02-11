namespace API.DataLayer.Commands.Auth;

public class RegisterUserCommand : IRequest<OutUserWithToken?>
{
    public RegisterUser? RegisterUser { get; set; }
}

public class RegisterCommandHandler : IRequestHandler<RegisterUserCommand, OutUserWithToken?>
{
    private readonly IUsersRepository _repository;

    public RegisterCommandHandler(MainContext context)
    {
        _repository = new UsersRepository(context);
    }

    public async Task<OutUserWithToken?> Handle(RegisterUserCommand request, CancellationToken cancellationToken)
    {
        var user = request?.RegisterUser?.MapToUser();
        User? res = null;
        if (user != null)  res = await _repository.AddEntryAsync(user);
        return OutUserWithToken.MapToOutUserWithToken(res);
    }
}
