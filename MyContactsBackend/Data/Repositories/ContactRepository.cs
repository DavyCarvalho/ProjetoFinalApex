using Data.DatabaseConnection;
using Data.Interfaces;
using Data.Models;
using System.Collections.Generic;
using System.Linq;

namespace Data.Repositories
{
    public class ContactRepository : IContactRepository
    {
        public ApiDbContext DbContext { get; set; }

        public ContactRepository(ApiDbContext dbContext)
        {
            DbContext = dbContext;
        }

        public void CreateContact(Contact contact)
        {
            DbContext.Contacts.Add(contact);

            DbContext.SaveChanges();
        }

        public void DeleteContact(Contact contact)
        {
            DbContext.Contacts.Remove(contact);

            DbContext.SaveChanges();
        }

        public List<Contact> GetContacts()
        {
            return DbContext.Contacts.ToList();
        }

        public Contact GetById(int id)
        {
            return DbContext.Contacts.FirstOrDefault(contact => contact.Id == id);
        }

        public void UpdateContact(Contact contact)
        {
            DbContext.Contacts.Update(contact);

            DbContext.SaveChanges();
        }
    }
}
