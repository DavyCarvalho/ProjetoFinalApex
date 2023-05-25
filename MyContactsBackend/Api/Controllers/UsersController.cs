using Data.Models;
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
        public List<User> Get()
        {
            return UserService.GetUsers();
        }

        [HttpPost]
        public void Post([FromBody] User user)
        {
            UserService.CreateUser(user);
        }

        [HttpPut]
        public void Put([FromBody] User user)
        {
            UserService.UpdateUser(user);
        }

        [HttpDelete]
        public void Delete([FromBody] User user)
        {
            UserService.DeleteUser(user);
        }
    }
}
