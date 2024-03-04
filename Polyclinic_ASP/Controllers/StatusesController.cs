using Application.DTOs;
using Application.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Polyclinic_ASP.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatusesController : ControllerBase
    {
        private IDbCrud _dbCrud;

        public StatusesController(IDbCrud dbCrud)
        {
            _dbCrud = dbCrud;
        }


        // GET: api/<StatusController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StatusDTO>>> GetStatuses()
        {
            try
            {
                var statuses = await Task.Run(() => _dbCrud.statusDTOs);
                return Ok(statuses);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
