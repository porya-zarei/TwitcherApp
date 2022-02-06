namespace API.DataLayer.Commands.Auth;

public class RegisterUserCommand : IRequest<OutUser>
{
    public RegisterUser RegisterUser { get; set; }
}

public class RegisterCommandHandler : IRequestHandler<RegisterUserCommand, OutUser>
{
    private readonly IUsersRepository _repository;

    public RegisterCommandHandler(MainContext context)
    {
        _repository = new UsersRepository(context);
    }

    public async Task<OutUser> Handle(RegisterUserCommand request, CancellationToken cancellationToken)
    {
        var user = request.RegisterUser.MapToUser();
        return OutUser.MapToOutUser(await _repository.AddEntryAsync(user));
    }
}
