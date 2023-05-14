using System.Collections.Generic;

namespace Services.Interfaces
{
    public interface IContactService
    {
        void CreateContact(string nome);
        List<string> GetContacts();
        void UpdateContact(string nome);
        void DeleteContact(string nome);
    }
}
