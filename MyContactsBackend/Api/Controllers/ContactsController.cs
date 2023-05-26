using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;
using System;
using Utils.Dtos.Contact;

namespace Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ContactsController : ControllerBase
    {
        private readonly IContactService _contactService;

        public ContactsController(IContactService contactService)
        {
            _contactService = contactService;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_contactService.GetContacts());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody] ContactCreateRequestDto contactDto)
        {
            try
            {
                var success = _contactService.CreateContact(contactDto);

                if (success == true)
                {
                    return Ok();
                }
                else
                {
                    return BadRequest("User Id not found.");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public IActionResult Put([FromBody] ContactUpdateRequestDto contactDto)
        {
            try
            {
                var success = _contactService.UpdateContact(contactDto);

                if (success == true)
                {
                    return Ok();
                }
                else
                {
                    return BadRequest("Contact not found.");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete([FromRoute] int id)
        {
            try
            {
                var success = _contactService.DeleteContact(id);

                if (success == true)
                {
                    return Ok();
                }
                else
                {
                    return BadRequest("Contact not found.");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
