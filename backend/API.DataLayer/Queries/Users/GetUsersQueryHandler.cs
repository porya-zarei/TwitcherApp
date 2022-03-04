namespace API.DataLayer.Queries.Users;

public class GetUsersQuery : IRequest<APIResult<List<OutUser>?>>
{
}


public class GetUsersQueryHandler:IRequestHandler<GetUsersQuery, APIResult<List<OutUser>?>>
{
    private readonly IUsersRepository _repository;

    public GetUsersQueryHandler(MainContext context)
    {
        _repository = new UsersRepository(context);
    }

    public async Task<APIResult<List<OutUser>?>> Handle(GetUsersQuery request, CancellationToken cancellationToken)
    {
        try
        {
            var allUsers = await _repository.GetAllUsers();
            if (allUsers != null)
            {
                return new ()
                {
                    Result = allUsers,
                    Message = "All Users",
                    Status = 200,
                };
            }
            return new ()
            {
                Result = null,
                Message = "Users not found",
                Status=400,
                Ok = false
            };
        }
        catch (Exception error)
        {
            return new ()
            {
                Result = null,
                Message = "Please try again",
                Status = 400,
                Errors = new string[]{ error.Message },
                Ok = false
            };
        }
    }
}
