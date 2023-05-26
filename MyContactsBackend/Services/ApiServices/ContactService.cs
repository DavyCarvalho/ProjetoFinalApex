using Data.Interfaces;
using Data.Models;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using Utils.Dtos.Contact;

namespace Services.ApiServices
{
    public class ContactService : IContactService
    {
        private readonly IContactRepository _contactRepository;
        private readonly IUserRepository _userRepository;

        public ContactService(
            IContactRepository contactRepository, 
            IUserRepository userRepository)
        {
            _contactRepository = contactRepository;
            _userRepository = userRepository;
        }

        public bool CreateContact(ContactCreateRequestDto contactCreateDto)
        {
            var user = _userRepository.GetById(contactCreateDto.UserId);

            if (user != null)
            {
                var contact = new Contact()
                {
                    Name = contactCreateDto.Name,
                    Phone = contactCreateDto.Phone,
                    UserId = contactCreateDto.UserId,
                    CreatedAt = DateTime.Now
                };

                _contactRepository.CreateContact(contact);

                return true;
            }

            return false;
        }

        public bool DeleteContact(int id)
        {
            var contact = _contactRepository.GetById(id);

            if (contact != null)
            {
                _contactRepository.DeleteContact(contact);

                return true;
            }

            return false;
        }

        public List<ContactResponseDto> GetContacts()
        {
            var contacts = _contactRepository.GetContacts();
            var contactDtos = new List<ContactResponseDto>();

            foreach (var contactModel in contacts)
            {
                contactDtos.Add(
                    new ContactResponseDto() 
                    {
                        Id = contactModel.Id,
                        Name = contactModel.Name,
                        Phone = contactModel.Phone,
                        UserId = contactModel.UserId
                    }
                );
            }

            return contactDtos;
        }

        public bool UpdateContact(ContactUpdateRequestDto contactUpdateDto)
        {
            var contactFound = _contactRepository.GetById(contactUpdateDto.Id);

            if (contactFound != null)
            {
                contactFound.Name = contactUpdateDto.Name;
                contactFound.Phone = contactUpdateDto.Phone;

                contactFound.UpdatedAt = DateTime.Now;

                _contactRepository.UpdateContact(contactFound);

                return true;
            }

            return false;
        }
    }
}
