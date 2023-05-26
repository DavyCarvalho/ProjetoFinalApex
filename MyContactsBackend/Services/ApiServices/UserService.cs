using Data.Interfaces;
using Data.Models;
using Services.Interfaces;
using System;
using System.Collections.Generic;
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

        public void CreateUser(UserCreateRequestDto userCreateDto)
        {
            var user = new User()
            {
                Name = userCreateDto.Name,
                Email = userCreateDto.Email,
                Password = userCreateDto.Password,
                Role = "user",
                CreatedAt = DateTime.Now
            };

            _userRepository.CreateUser(user);
        }

        public bool DeleteUser(int id)
        {
            var user = _userRepository.GetById(id);

            if (user != null)
            {
                _userRepository.DeleteUser(user);

                return true;
            }

            return false;
        }

        public List<UserResponseDto> GetUsers()
        {
            var users = _userRepository.GetUsers();
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

        public bool UpdateUser(UserUpdateRequestDto userUpdateDto)
        {
            var userFound = _userRepository.GetById(userUpdateDto.Id);

            if (userFound != null)
            {
                userFound.Name = userUpdateDto.Name;
                userFound.Email = userUpdateDto.Email;

                userFound.UpdatedAt = DateTime.Now;

                _userRepository.UpdateUser(userFound);

                return true;
            }

            return false;
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
