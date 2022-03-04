

using API.DataLayer.DTOs;
using API.DataLayer.Queries.Users;

namespace API.Tests.Systems.Controllers;

public class TestUsersController
{
    [Fact]
    public async Task TestGetAllUsers()
    {
        // Arrange
        var envMock = new Mock<IOptionsMonitor<JwtConfig>>();
        var mediatorMock = new Mock<IMediator>();
        // mediatorMock.Setup();
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
