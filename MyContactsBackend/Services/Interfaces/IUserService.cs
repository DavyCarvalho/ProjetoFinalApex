using System.Collections.Generic;

namespace Services.Interfaces
{
    public interface IUserService
    {
        void CreateUser(string nome);
        List<string> GetUsers();
        void UpdateUser(string nome);
        void DeleteUser(string nome);
    }
}
