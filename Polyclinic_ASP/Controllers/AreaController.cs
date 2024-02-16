using Application.DTOs;
using Application.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace Polyclinic_ASP.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AreaController : ControllerBase
    {
        private IDbCrud _dbCrud;

        public AreaController(IDbCrud dbCrud)
        {
            _dbCrud = dbCrud;
        }

        // GET: api/<AreaController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AreaDTO>>> GetAreas()
        {
            try
            {
                var areas = await Task.Run(() => _dbCrud.areaDTOs);
                return Ok(areas);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
