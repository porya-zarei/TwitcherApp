using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.DataLayer.Commands.Auth;

public class LoginUserWithTokenCommand : IRequest<OutUserWithToken?>
{
    public string UserName { get; set; } = "";
}

public class LoginWithTokenCommandHandler : IRequestHandler<LoginUserWithTokenCommand, OutUserWithToken?>
{
    private readonly IUsersRepository _userRepository;
    public LoginWithTokenCommandHandler(MainContext context)
    {
        _userRepository = new UsersRepository(context);
    }
    public async Task<OutUserWithToken?> Handle(LoginUserWithTokenCommand request, CancellationToken cancellationToken)
    {
        var res = await _userRepository.GetUserWithUserName(request.UserName);
        return OutUserWithToken.MapToOutUserWithToken(res);
    }
}
