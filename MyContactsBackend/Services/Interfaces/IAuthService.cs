using System.Threading.Tasks;
using Utils.Dtos.Auth;

namespace Services.Interfaces
{
    public interface IAuthService
    {
        Task<string> Login(LoginRequestDto loginRequestDto);
    }
}
