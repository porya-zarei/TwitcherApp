using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.DataLayer.Services;

public class UsersRepository:Repository<User>,IUsersRepository
{
    public UsersRepository(MainContext context):base(context)
    {

    }

    public async Task<User?> AuthenticateUser(LoginUser? loginUser)
    {
        if (loginUser != null && loginUser.UserName != null)
        {
            var user = await _set.Include(u => u.Followers).Include(u => u.Followings).FirstOrDefaultAsync(u => u.UserName == loginUser.UserName);
            if (user != null && user.Password == loginUser.Password) return user;
            else return null;
        }
        else if (loginUser != null && loginUser.Email != null)
        {
            var user = await _set.Include(u => u.Followers).Include(u => u.Followings ).FirstOrDefaultAsync(u => u.Email == loginUser.Email);
            if (user != null && user.Password == loginUser.Password) return user;
            else return null;
        }
        else return null;
    }

    public async Task<User?> GetUserWithUserName(string userName)
    {
        return (await _set.Include(u => u.Followers).Include(u => u.Followings).FirstOrDefaultAsync(u => u.UserName == userName));
    }

    public async Task<List<User>> GetUsersWithUserNames(string[] userNames)
    {
        var users = await _set.Where(u => userNames.Contains(u.UserName)).Include(u => u.Followings).ToListAsync();
        return users;
    }


    public async Task<User?> GetUserWithUserName(string userName,bool full,bool? tracking=false)
    {
        var query = _set
                .Include(u => u.Followers)
                .Include(u => u.Followings);
        if (full)
            query.Include(u => u.Tweets);
        if (tracking != null && (bool)!tracking)
            query.AsNoTracking();
        return await query.FirstOrDefaultAsync();

    }

    public async Task<bool> FollowingUser(string followerUserName,string followingUserName)
    {
        if (followerUserName != null && followingUserName != null)
        {
            var follower = await GetUserWithUserName(followerUserName);
            var following = await GetUserWithUserName(followingUserName);

            if (follower != null && following != null)
            {
                if (follower.Followings != null)
                {
                    follower.Followings?.Add(following);
                }
                else
                {
                    follower.Followings = new List<User>() { };
                    follower.Followings.Add(following);
                }
                if (following.Followers != null)
                {
                    following.Followers.Add(follower);
                }
                else
                {
                    following.Followers = new List<User>() { };
                    following.Followers.Add(follower);
                }
                await SaveAsync();
                return true;
            }
        }
        return false;
    }

    public async Task<bool> UnFollowingUser(string followerUserName, string followedUserName)
    {
        if (followerUserName != null && followedUserName != null)
        {
            var follower = await GetUserWithUserName(followerUserName);
            var followed = await GetUserWithUserName(followedUserName);
            if (follower != null && followed != null)
            {
                if (follower.Followings != null && follower.Followings.Contains(followed))
                {
                    follower.Followings.Remove(followed);
                }
                if (followed.Followers != null && followed.Followers.Contains(follower))
                {
                    followed.Followers.Remove(follower);
                }
                await SaveAsync();
                return true;
            }
        }
        return false;
    }
    
    public async Task<List<OutUser>> GetAllUsers()
    {
        var allUsers = await _set
            .Include(u => u.Followers)
            .Include(u => u.Followings)
            .Include(u => u.Tweets)
            .Where(u => u != null && u.UserName !=null && u.UserName.Length>0)
            .Select(u => OutUser.MapToOutUser(u)!)
            .ToListAsync();
        return allUsers;
    }

    public async Task<bool> IsUserNameUnique(string userName)
    {
        var isUnique = userName.Length > 3 && !(await _set.AnyAsync(u => u.UserName == userName));
        return isUnique;
    }

    public async Task<bool> SetConnectionId(string userName,string connectionId)
    {
        if (! string.IsNullOrEmpty(userName) && !string.IsNullOrEmpty(connectionId))
        {
            var user = await GetUserWithUserName(userName); 
            if (user != null) user.ConnectionId = connectionId; return true;
        }
        return false;
    }

    public async Task<List<OutChat>> GetUserChats(string userName)
    {
        var user = await _set
            .Include(u => u.Chats)
            .ThenInclude(c => c.Messages)
            .FirstOrDefaultAsync(u => u.UserName == userName);
        return user != null ? user.Chats.Select(c => OutChat.MapToOutChat(c)).ToList() : new List<OutChat> { };
    }
}
