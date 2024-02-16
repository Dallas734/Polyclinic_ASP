using Application.DTOs;
using Application.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace Polyclinic_ASP.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SpecializationController : ControllerBase
    {
        private IDbCrud _dbCrud;

        public SpecializationController(IDbCrud dbCrud)
        {
            _dbCrud = dbCrud;
        }
        // GET: api/<SpecializationController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SpecializationDTO>>> GetSpecs()
        {
            try
            {
                var specs = await Task.Run(() => _dbCrud.specializationDTOs);
                return Ok(specs);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
