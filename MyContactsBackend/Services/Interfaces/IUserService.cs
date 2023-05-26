using System.Collections.Generic;
using Utils.Dtos.User;

namespace Services.Interfaces
{
    public interface IUserService
    {
        void CreateUser(UserCreateRequestDto userCreateDto);
        List<UserResponseDto> GetUsers();
        bool UpdateUser(UserUpdateRequestDto userUpdateDto);
        bool DeleteUser(int id);
    }
}
