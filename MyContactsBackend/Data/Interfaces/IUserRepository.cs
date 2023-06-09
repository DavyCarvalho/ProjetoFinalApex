using Data.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Data.Interfaces
{
    public interface IUserRepository
    {
        Task CreateAsync(User user);
        Task<List<User>> GetAllAsync();
        Task<User> GetByIdAsync(int id);
        Task<User> GetByEmailAndPasswordAsync(string email, string password);
        void Update(User user);
        void Delete(User user);
        Task SaveChangesAsync();
    }
}
