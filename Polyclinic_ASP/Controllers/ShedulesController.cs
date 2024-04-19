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
    public class ShedulesController : ControllerBase
    {
        private IDbCrud _dbCrud;
        private ISheduleService _sheduleService;

        public ShedulesController(IDbCrud dbCrud, ISheduleService sheduleService)
        {
            _dbCrud = dbCrud;
            _sheduleService = sheduleService;
        }

        [HttpGet]
        [Authorize(Roles = "Registrator, Doctor")]
        public async Task<ActionResult<IEnumerable<SheduleDTO>>> GetShedule(int doctorId)
        {
            try
            {
                var shedule = await Task.Run(() => _sheduleService.GetSheduleOnDoctor(doctorId));
                return Ok(shedule);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        [Authorize(Roles = "Registrator")]
        public async Task<IActionResult> PutShedule(List<SheduleDTO> shedules)
        {
            if (shedules == null)
                return BadRequest();

            try
            {
                foreach (var shedule in shedules)
                    await Task.Run(() => _dbCrud.UpdateShedule(shedule));
                await _dbCrud.Save();
            }
            catch (Exception e)
            {
                BadRequest(e.Message);
            }

            return Ok();
        }

    }
}
