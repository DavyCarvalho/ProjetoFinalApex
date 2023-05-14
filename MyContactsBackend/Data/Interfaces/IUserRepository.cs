using System.Collections.Generic;

namespace Data.Interfaces
{
    public interface IUserRepository
    {
        void CreateUser();
        List<string> GetUsers();
        void UpdateUser();
        void DeleteUser();
    }
}
