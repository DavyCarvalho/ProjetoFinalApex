using Data.DatabaseConnection;
using Data.Interfaces;
using Data.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Data.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ApiDbContext _dbContext;

        public UserRepository(ApiDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task CreateAsync(User user)
        {
            await _dbContext.Users.AddAsync(user);
        }

        public void Delete(User user)
        {
            _dbContext.Users.Remove(user);
        }

        public async Task<List<User>> GetAllAsync()
        {
            return await _dbContext.Users.Include(usuario => usuario.Contacts).ToListAsync();
        }

        public async Task<User> GetByIdAsync(int id)
        {
            return await _dbContext.Users.FirstOrDefaultAsync(user => user.Id == id);
        }

        public async Task<User> GetByEmailAndPasswordAsync(string email, string password)
        {
            return await _dbContext.Users.FirstOrDefaultAsync(user => user.Email == email && user.Password == password);
        }

        public void Update(User user)
        {
            _dbContext.Users.Update(user);
        }

        public async Task SaveChangesAsync()
        {
            await _dbContext.SaveChangesAsync();
        }
    }
}
