namespace API.DataLayer.Queries.Users;

public class GetVisitedUserQuery : IRequest<APIResult<FullOutUser?>>
{
    public string userName { get; set; } = "";
}

public class GetVisitedUserQueryHandler : IRequestHandler<GetVisitedUserQuery, APIResult<FullOutUser?>>
{
    private readonly UnitOfWork _unitOfWork;
    public GetVisitedUserQueryHandler(MainContext context)
    {
        _unitOfWork = new UnitOfWork(context);
    }
    public async Task<APIResult<FullOutUser?>> Handle(GetVisitedUserQuery request, CancellationToken cancellationToken)
    {
        try
        {
            var user = await _unitOfWork.usersRepository.GetUserWithUserName(request.userName,true);
            if (user != null)
            {
                return new APIResult<FullOutUser?>
                {
                    Result = FullOutUser.MapToFullOutUser(user),
                    Message = "Successful",
                    Status = 200
                };
            }
            return new APIResult<FullOutUser?>
            {
                Message = "user not found",
                Ok = false,
                Status = 404,
            };
        }
        catch (Exception error)
        {
            return new APIResult<FullOutUser?>
            {
                Message = error.Message,
                Ok = false,
                Status = 500,
            };
        }
    }
}
