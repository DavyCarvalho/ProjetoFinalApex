using Data.Interfaces;
using Data.Models;
using Services.Interfaces;
using System.Collections.Generic;

namespace Services.ApiServices
{
    public class ContactService : IContactService
    {
        public IContactRepository ContactRepository;

        public ContactService(IContactRepository contactRepository)
        {
            ContactRepository = contactRepository;
        }

        public void CreateContact(Contact contact)
        {
            ContactRepository.CreateContact(contact);
        }

        public void DeleteContact(Contact contact)
        {
            ContactRepository.DeleteContact(contact);
        }

        public List<Contact> GetContacts()
        {
            return ContactRepository.GetContacts();
        }

        public void UpdateContact(Contact contact)
        {
            ContactRepository.UpdateContact(contact);
        }
    }
}
