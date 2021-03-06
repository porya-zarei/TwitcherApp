using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.DataLayer.Interfaces;

public interface IUsersRepository : IRepository<User>
{
    Task<User?> AuthenticateUser(LoginUser? loginUser);
    Task<bool> FollowingUser(string followerUserName, string followingUserName);
    Task<List<OutUser>> GetAllUsers();
    Task<List<OutChat>> GetUserChats(string userName);
    Task<List<User>> GetUsersWithUserNames(string[] userNames);
    Task<User?> GetUserWithUserName(string userName);
    Task<User?> GetUserWithUserName(string userName,bool full,bool? tracking=false);
    Task<bool> IsUserNameUnique(string userName);
    Task<bool> UnFollowingUser(string followerUserName, string followedUserName);
}
