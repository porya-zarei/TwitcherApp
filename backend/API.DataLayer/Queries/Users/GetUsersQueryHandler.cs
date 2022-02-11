namespace API.DataLayer.Queries.Users;

public class GetUsersQuery : IRequest<List<OutUser>>
{
}


public class GetUsersQueryHandler:IRequestHandler<GetUsersQuery,List<OutUser>>
{
    private readonly IUsersRepository _repository;

    public GetUsersQueryHandler(MainContext context)
    {
        _repository = new UsersRepository(context);
    }

    public async Task<List<OutUser>> Handle(GetUsersQuery request, CancellationToken cancellationToken)
    {
        return await _repository.GetAllUsers();
    }
}
