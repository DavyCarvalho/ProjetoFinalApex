using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        [HttpGet]
        public string Get()
        {
            return "feito get";
        }

        [HttpPost]
        public string Post()
        {
            return "feito post";
        }

        [HttpPut]
        public string Put()
        {
            return "feito put";
        }

        [HttpDelete]
        public string Delete()
        {
            return "feito delete";
        }
    }
}
