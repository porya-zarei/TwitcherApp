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

    public async Task<User?> AuthenticateUser(LoginUser loginUser)
    {
        if (loginUser != null && loginUser.UserName != null)
        {
            var user = await _set.FirstOrDefaultAsync(u => u.UserName == loginUser.UserName);
            if (user != null && user.Password == loginUser.Password) return user;
            else return null;
        }
        else if (loginUser != null && loginUser.Email != null)
        {
            var user = await _set.FirstOrDefaultAsync(u => u.Email == loginUser.Email);
            if (user != null && user.Password == loginUser.Password) return user;
            else return null;
        }
        else return null;
    }

    public async Task<User?> GetUserWithUserName(string userName)
    {
        return (await _set.FirstOrDefaultAsync(u => u.UserName == userName));
    }
}
