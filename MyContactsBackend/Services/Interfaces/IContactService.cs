using Data.Models;
using System.Collections.Generic;

namespace Services.Interfaces
{
    public interface IContactService
    {
        void CreateContact(Contact contact);
        List<Contact> GetContacts();
        void UpdateContact(Contact contact);
        void DeleteContact(Contact contact);
    }
}
