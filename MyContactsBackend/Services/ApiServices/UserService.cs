using Data.Interfaces;
using Data.Models;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Utils.Dtos.Contact;
using Utils.Dtos.User;

namespace Services.ApiServices
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task CreateAsync(UserCreateRequestDto userCreateDto)
        {
            var user = new User()
            {
                Name = userCreateDto.Name,
                Email = userCreateDto.Email,
                Password = userCreateDto.Password,
                Role = "consumer",
                CreatedAt = DateTime.Now
            };

            await _userRepository.CreateAsync(user);

            await _userRepository.SaveChangesAsync();
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var user = await _userRepository.GetByIdAsync(id);

            if (user != null)
            {
                _userRepository.Delete(user);

                await _userRepository.SaveChangesAsync();

                return true;
            }

            return false;
        }

        public async Task<List<UserResponseDto>> GetAllAsync()
        {
            var users = await _userRepository.GetAllAsync();
            var userDtos = new List<UserResponseDto>();

            foreach (var userModel in users)
            {
                var userDto = new UserResponseDto()
                {
                    Id = userModel.Id,
                    Name = userModel.Name,
                    Email = userModel.Email,
                    Contacts = GetContactDtosList(userModel.Contacts)
                };

                userDtos.Add(userDto);
            }

            return userDtos;
        }

        public async Task<bool> UpdateAsync(UserUpdateRequestDto userUpdateDto)
        {
            var userFound = await _userRepository.GetByIdAsync(userUpdateDto.Id);

            if (userFound != null)
            {
                userFound.Name = userUpdateDto.Name;
                userFound.Email = userUpdateDto.Email;

                userFound.UpdatedAt = DateTime.Now;

                _userRepository.Update(userFound);

                await _userRepository.SaveChangesAsync();

                return true;
            }

            return false;
        }

        public async Task UpdateToAdmin(int userId)
        {
            var existingUser = await _userRepository.GetByIdAsync(userId);

            if (existingUser != null)
            {
                existingUser.Role = "admin";
                existingUser.UpdatedAt = DateTime.Now;

                _userRepository.Update(existingUser);

                await _userRepository.SaveChangesAsync();
            }
        }

        private List<BaseContactDto> GetContactDtosList(List<Contact> contactModels)
        {
            var contactDtos = new List<BaseContactDto>();

            foreach (var contactModel in contactModels)
            {
                contactDtos.Add(
                    new BaseContactDto()
                    {
                        Name = contactModel.Name,
                        Phone = contactModel.Phone
                    }
                );
            }

            return contactDtos;
        }
    }
}
