using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;
using System.Collections.Generic;

namespace Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        public IUserService UserService;

        public UsersController(IUserService userService)
        {
            UserService = userService;
        }

        [HttpGet]
        public List<string> Get()
        {
            return UserService.GetUsers();
        }

        [HttpPost]
        public void Post()
        {
            UserService.CreateUser("");
        }

        [HttpPut]
        public void Put()
        {
            UserService.UpdateUser("");
        }

        [HttpDelete]
        public void Delete()
        {
            UserService.DeleteUser("");
        }
    }
}
