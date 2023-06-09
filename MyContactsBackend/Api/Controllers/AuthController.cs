using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;
using System;
using System.Threading.Tasks;
using Utils.Api;
using Utils.Dtos.Auth;

namespace Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginRequestDto loginRequestDto)
        {
            try
            {
                var token = await _authService.Login(loginRequestDto);

                if (token == string.Empty)
                {
                    return BadRequest(new ApiResponse("Dados de login inválidos! Verifique e tente novamente."));
                }

                return Ok(new ApiResponse<string>(token));
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse(ex.Message));
            }
        }
    }
}
