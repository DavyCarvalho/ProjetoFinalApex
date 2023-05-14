using Data.Interfaces;
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

        public void CreateContact(string nome)
        {
            ContactRepository.CreateContact();
        }

        public void DeleteContact(string nome)
        {
            ContactRepository.DeleteContact();
        }

        public List<string> GetContacts()
        {
            return ContactRepository.GetContacts();
        }

        public void UpdateContact(string nome)
        {
            ContactRepository.UpdateContact();
        }
    }
}
