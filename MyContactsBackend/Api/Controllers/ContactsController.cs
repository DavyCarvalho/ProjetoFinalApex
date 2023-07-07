using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Utils.Api;
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

        [Authorize(Policy = "Consumer")]
        [HttpGet]
        public async Task<IActionResult> GetAllUserContacts()
        {
            try
            {
                var userId = GetUserIdFromRequestClaims();

                var result = await _contactService.GetAllAsync(userId);

                return Ok(new ApiResponse<List<ContactResponseDto>>(result));
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse(ex.Message));
            }
        }

        [Authorize(Policy = "Consumer")]
        [HttpPost]
        public async Task<IActionResult> CreateNewContact([FromBody] ContactCreateRequestDto contactDto)
        {
            try
            { 
                contactDto.UserId = GetUserIdFromRequestClaims();

                var success = await _contactService.CreateAsync(contactDto);

                if (success == true)
                {
                    return Ok(new ApiResponse());
                }
                else
                {
                    return BadRequest(new ApiResponse("User Id not found."));
                }
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse(ex.Message));
            }
        }

        [Authorize(Policy = "Consumer")]
        [HttpPut]
        public async Task<IActionResult> UpdateContact([FromBody] ContactUpdateRequestDto contactDto)
        {
            try
            {
                var success = await _contactService.UpdateAsync(contactDto);

                if (success == true)
                {
                    return Ok(new ApiResponse());
                }
                else
                {
                    return BadRequest(new ApiResponse("Contact not found."));
                }
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse(ex.Message));
            }
        }

        [Authorize(Policy = "Consumer")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContact([FromRoute] int id)
        {
            try
            {
                var success = await _contactService.DeleteAsync(id);

                if (success == true)
                {
                    return Ok(new ApiResponse());
                }
                else
                {
                    return BadRequest(new ApiResponse("Contact not found."));
                }
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse(ex.Message));
            }
        }

        private int GetUserIdFromRequestClaims()
        {
            string token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");

            var tokenHandler = new JwtSecurityTokenHandler();
            var jwtToken = tokenHandler.ReadJwtToken(token);
            var nameIdClaim = jwtToken.Claims.FirstOrDefault(c => c.Type == "nameid");

            if (nameIdClaim is null)
            {
                throw new Exception();
            }

            return int.Parse(nameIdClaim.Value);
        }
    }
}
