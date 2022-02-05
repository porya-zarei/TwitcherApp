using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.DataLayer.Interfaces;

public interface IUserRepository : IRepository<User>
{
    Task<User?> AuthenticateUser(LoginUser loginUser);
}
