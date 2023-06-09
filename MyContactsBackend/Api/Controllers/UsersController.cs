using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Utils.Api;
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

        [Authorize(Policy = "Administrator")]
        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            try
            {
                var result = await _userService.GetAllAsync();

                return Ok(new ApiResponse<List<UserResponseDto>>(result));
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse(ex.Message));
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateNewUser([FromBody] UserCreateRequestDto userDto)
        {
            try
            {
                await _userService.CreateAsync(userDto);

                return Ok(new ApiResponse());
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse(ex.Message));
            }
        }

        [Authorize(Policy = "Administrator")]
        [HttpPut]
        public async Task<IActionResult> UpdateUser([FromBody] UserUpdateRequestDto userDto)
        {
            try
            {
                var success = await _userService.UpdateAsync(userDto);

                if (success == true)
                {
                    return Ok(new ApiResponse());
                }
                else
                {
                    return BadRequest(new ApiResponse("User not found."));
                }
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse(ex.Message));
            }
        }

        [Authorize(Policy = "Administrator")]
        [HttpPut("update-to-admin/{id}")]
        public async Task<IActionResult> UpdateToAdmin([FromRoute] int id)
        {
            try
            {
                await _userService.UpdateToAdmin(id);

                return Ok(new ApiResponse());
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse(ex.Message));
            }
        }

        [Authorize(Policy = "Administrator")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser([FromRoute] int id)
        {
            try
            {
                var success = await _userService.DeleteAsync(id);

                if (success == true)
                {
                    return Ok(new ApiResponse());
                }
                else
                {
                    return BadRequest(new ApiResponse("User not found."));
                }
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse(ex.Message));
            }
        }
    }
}
