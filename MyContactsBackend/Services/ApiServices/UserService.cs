using Data.Interfaces;
using Services.Interfaces;
using System.Collections.Generic;

namespace Services.ApiServices
{
    public class UserService : IUserService
    {
        public IUserRepository UserRepository;

        public UserService(IUserRepository userRepository)
        {
            UserRepository = userRepository;
        }

        public void CreateUser(string nome)
        {
            UserRepository.CreateUser();
        }

        public void DeleteUser(string nome)
        {
            UserRepository.DeleteUser();
        }

        public List<string> GetUsers()
        {
            return UserRepository.GetUsers();
        }

        public void UpdateUser(string nome)
        {
            UserRepository.UpdateUser();
        }
    }
}
