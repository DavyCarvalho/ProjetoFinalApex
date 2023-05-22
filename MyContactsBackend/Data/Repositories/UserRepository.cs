using Data.DatabaseConnection;
using Data.Interfaces;
using Data.Models;
using System.Collections.Generic;
using System.Linq;

namespace Data.Repositories
{
    public class UserRepository : IUserRepository
    {
        public ApiDbContext DbContext { get; set; }

        public UserRepository(ApiDbContext dbContext)
        {
            DbContext = dbContext;
        }

        public void CreateUser(User user)
        {
            DbContext.Users.Add(user);
        }

        public void DeleteUser(User user)
        {
            DbContext.Users.Remove(user);
        }

        public List<User> GetUsers()
        {
            return DbContext.Users.ToList();
        }

        public void UpdateUser(User user)
        {
            DbContext.Users.Update(user);
        }
    }
}
