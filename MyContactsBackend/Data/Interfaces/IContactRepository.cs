using System.Collections.Generic;

namespace Data.Interfaces
{
    public interface IContactRepository
    {
        void CreateContact();
        List<string> GetContacts();
        void UpdateContact();
        void DeleteContact();
    }
}
