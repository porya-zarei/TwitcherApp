namespace API.DataLayer.Queries.Users;

public class GetUsersQuery : IRequest<List<OutUser>>
{
}


public class GetUsersQueryHandler:IRequestHandler<GetUsersQuery,List<OutUser>>
{
    private readonly IUserRepository _repository;

    public GetUsersQueryHandler(MainContext context)
    {
        _repository = new UserRepository(context);
    }

    public async Task<List<OutUser>> Handle(GetUsersQuery request, CancellationToken cancellationToken)
    {
        return (await _repository.GetAllEntries()).Select(u => OutUser.MapToOutUser(u)).ToList();
    }
}
