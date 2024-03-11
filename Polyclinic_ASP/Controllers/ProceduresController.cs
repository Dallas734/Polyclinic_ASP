using Application.DTOs;
using Application.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Polyclinic_ASP.Controllers
{
    [Route("api/[controller]")]
    [EnableCors]
    [ApiController]
    public class ProceduresController : ControllerBase
    {
        private IDbCrud _dbCrud;

        public ProceduresController(IDbCrud dbCrud)
        {
            _dbCrud = dbCrud;
        }

        // GET: api/<ProceduresController>
        [HttpGet]
        [Authorize(Roles = "Registrator, Doctor")]
        public async Task<ActionResult<IEnumerable<DiagnosisDTO>>> GetProcedures()
        {
            try
            {
                var procedures = await Task.Run(() => _dbCrud.procedureDTOs);
                return Ok(procedures);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
