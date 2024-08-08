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
        public async Task<ActionResult<IEnumerable<WorkloadAreaReportDTO>>> WorkLoadAreaReport(DateOnly begin, DateOnly end)
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

        [HttpGet("WorkloadDoctorReport")]
        [Authorize(Roles = "Registrator")]
        public async Task<ActionResult<IEnumerable<WorkloadDoctorReportDTO>>> WorkloadDoctorReport(DateOnly begin, DateOnly end, int specId)
        {
            try
            {
                var report = await Task.Run(() => _reportService.MakeWorkloadDoctorReport(begin, end, specId));

                return Ok(report);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("WorkloadDiagnosisReport")]
        [Authorize(Roles = "Doctor")]
        public async Task<ActionResult<IEnumerable<WorkloadDiagnosisReportDTO>>> WorkloadDiagnosisReport(DateOnly begin, DateOnly end, int doctorId)
        {
            try
            {
                var report = await Task.Run(() => _reportService.MakeWorkloadDiagnosisReport(begin, end, doctorId));

                return Ok(report);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
