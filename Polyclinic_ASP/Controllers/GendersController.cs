using Application.DTOs;
using Application.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Polyclinic_ASP.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GendersController : ControllerBase
    {
        private IDbCrud _dbCrud;

        public GendersController(IDbCrud dbCrud)
        {
            _dbCrud = dbCrud;
        }
        // GET: api/<GenderController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoryDTO>>> GetGenders()
        {
            try
            {
                var genders = await Task.Run(() => _dbCrud.genderDTOs);
                return Ok(genders);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
