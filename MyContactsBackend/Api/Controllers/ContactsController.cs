using Data.Models;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;
using System.Collections.Generic;

namespace Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ContactsController : ControllerBase
    {
        public IContactService ContactService;

        public ContactsController(IContactService contactService)
        {
            ContactService = contactService;
        }

        [HttpGet]
        public List<Contact> Get()
        {
            return ContactService.GetContacts();
        }

        [HttpPost]
        public void Post([FromBody] Contact contact)
        {
            ContactService.CreateContact(contact);
        }

        [HttpPut]
        public void Put([FromBody] Contact contact)
        {
            ContactService.UpdateContact(contact);
        }

        [HttpDelete]
        public void Delete([FromBody] Contact contact)
        {
            ContactService.DeleteContact(contact);
        }
    }
}
