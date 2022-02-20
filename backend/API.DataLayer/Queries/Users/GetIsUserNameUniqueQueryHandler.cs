namespace API.DataLayer.Queries.Users;

public class GetIsUserNameUniqueQuery : IRequest<APIResult<bool>>
{
    public string UserName { get; set; } = "";
}

public class GetIsUserNameUniqueQueryHandler : IRequestHandler<GetIsUserNameUniqueQuery, APIResult<bool>>
{
    private readonly UnitOfWork _unitOfWork;
    public GetIsUserNameUniqueQueryHandler(MainContext context)
    {
        _unitOfWork = new UnitOfWork(context);
    }
    public async Task<APIResult<bool>> Handle(GetIsUserNameUniqueQuery request, CancellationToken cancellationToken)
    {
        try
        {
            var result = await _unitOfWork.usersRepository.IsUserNameUnique(request.UserName);
            return new APIResult<bool>
            {
                Result = result,
                Message = result? "is unique":"is not unique",
                Status = 200
            };
        }
        catch (Exception error)
        {
            return new APIResult<bool>
            {
                Result = false,
                Ok = false,
                Status = 400,
                Message = error.Message
            };
        }
    }
}
