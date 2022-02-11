using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.DataLayer.Interfaces;

public interface IUsersRepository : IRepository<User>
{
    Task<User?> AuthenticateUser(LoginUser loginUser);
    Task<bool> FollowingUser(string followerUserName, string followingUserName);
    Task<List<OutUser>> GetAllUsers();
    Task<User?> GetUserWithUserName(string userName);
    Task<bool> IsUserNameUnique(string userName);
    Task<bool> UnFollowingUser(string followerUserName, string followedUserName);
}
