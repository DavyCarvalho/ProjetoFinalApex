using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;
using System;
using Utils.Dtos.User;

namespace Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_userService.GetUsers());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody] UserCreateRequestDto userDto)
        {
            try
            {
                _userService.CreateUser(userDto);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public IActionResult Put([FromBody] UserUpdateRequestDto userDto)
        {
            try
            {
                var success = _userService.UpdateUser(userDto);

                if (success == true)
                {
                    return Ok();
                }
                else
                {
                    return BadRequest("User not found.");
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
                var success = _userService.DeleteUser(id);

                if (success == true)
                {
                    return Ok();
                }
                else
                {
                    return BadRequest("User not found.");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
