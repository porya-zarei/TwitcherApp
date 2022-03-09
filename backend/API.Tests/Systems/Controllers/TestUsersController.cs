namespace API.Tests.Systems.Controllers;

public class TestUsersController
{

    [Fact]
    public async Task TestGetAllUsers()
    {
        // Arrange
        var envMock = new Mock<IOptionsMonitor<JwtConfig>>();
        var mediatorMock = new Mock<IMediator>();
        var context = new Mock<MainContext>();
        var query = new Mock<GetUsersQuery>();
        var handler = new Mock<GetUsersQueryHandler>();
        
        handler.Setup(x => x.Handle(query.Object,It.IsAny<CancellationToken>())).ReturnsAsync(() => new APIResult<List<OutUser>?>());
        mediatorMock.Setup( m => m.Send(query.Object,It.IsAny<CancellationToken>())).Returns(()=> new APIResult<List<OutUser>?>());
        var usersController = new UsersController(mediatorMock.Object,envMock.Object);
        
        var response = (await usersController.GetAllUsers());
        var result = response.Value;
        if (result!=null && result.Ok)
        {
            result.Result.Should().AllBeOfType<List<OutUser>>();
            result.Message.Should().Be("All Users");
            result.Status.Should().Be(200);
        }
        else if(result!=null)
        {
            result.Should().NotBeNull();
            result.Result?.Should().BeNull();
            result.Status.Should().Be(400);
            result.Message.Length.Should().BePositive();
        }
    }
}
