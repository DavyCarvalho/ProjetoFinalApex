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
        public List<string> Get()
        {
            return ContactService.GetContacts();
        }

        [HttpPost]
        public void Post()
        {
            ContactService.CreateContact("");
        }

        [HttpPut]
        public void Put()
        {
            ContactService.UpdateContact("");
        }

        [HttpDelete]
        public void Delete()
        {
            ContactService.DeleteContact("");
        }
    }
}
