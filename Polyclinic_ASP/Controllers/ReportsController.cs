using Application.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Application.Interfaces.Services;


namespace Polyclinic_ASP.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportsController : ControllerBase
    {

        private IReportService _reportService;

        public ReportsController(IReportService reportService)
        {
            _reportService = reportService;
        }

        [HttpGet("WorkLoadAreaReport")]
        [Authorize(Roles = "Registrator")]
        public async Task<ActionResult<IEnumerable<Talon>>> WorkLoadAreaReport(DateOnly begin, DateOnly end)
        {
            try
            {
                var visits = await Task.Run(() => _reportService.MakeWorkLoadAreaReport(begin, end));

                return Ok(visits);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    }
}
