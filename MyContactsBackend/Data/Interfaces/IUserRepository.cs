using Data.Models;
using System.Collections.Generic;

namespace Data.Interfaces
{
    public interface IUserRepository
    {
        void CreateUser(User user);
        List<User> GetUsers();
        void UpdateUser(User user);
        void DeleteUser(User user);
    }
}
