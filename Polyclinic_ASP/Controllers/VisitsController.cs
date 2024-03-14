using Application.DTOs;
using Application.Interfaces.Services;
using Domain.DomainModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;


namespace Polyclinic_ASP.Controllers
{
    [Route("api/[controller]")]
    [EnableCors]
    [ApiController]
    public class VisitsController : ControllerBase
    {
        private IDbCrud _dbCrud;
        private IVisitService _visitService;
        public VisitsController(IDbCrud dbCrud, IVisitService visitService)
        {
            _dbCrud = dbCrud;
            _visitService = visitService;
        }

        // GET: api/<VisitController>
        [HttpGet]
        [Authorize(Roles = "Registrator, Doctor")]
        public async Task<ActionResult<IEnumerable<VisitDTO>>> GetVisits()
        {
            try
            {
                var visits = await Task.Run(() => _dbCrud.visitDTOs);
                return Ok(visits);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET api/<VisitController>/5
        [HttpGet("{id}")]
        [Authorize(Roles = "Registrator, Doctor")]
        public async Task<ActionResult<VisitDTO>> GetVisit(int id)
        {
            var visit = await Task.Run(() => _dbCrud.visitDTOs.FirstOrDefault(i => i.Id == id));

            if (visit == null)
            {
                return NotFound();
            }

            return Ok(visit);
        }

        [HttpGet("Talons")]
        [Authorize(Roles = "Registrator, Doctor")]
        public async Task<ActionResult<IEnumerable<Talon>>> GetTalons(int doctorId, DateOnly date)
        {
            try
            {
                var visits = await Task.Run(() => _visitService.GetTalons(doctorId, date));

                return Ok(visits);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/<VisitController>
        [HttpPost]
        [Authorize(Roles = "Registrator")]
        public async Task<ActionResult<VisitDTO>> PostVisit(VisitDTO visit)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values.SelectMany(e => e.Errors.Select(e => e.ErrorMessage)));
            }

            try
            {
                visit.VisitStatusId = 1;
                visit.VisitStatusName = _dbCrud.visitStatusDTOs.Find(i => i.Id == visit.VisitStatusId).Name;
                visit.PatientFullName = _dbCrud.patientDTOs.Find(i => i.Id == visit.PatientId).FullName;
                visit.DoctorFullName = _dbCrud.doctorDTOs.Find(i => i.Id == visit.DoctorId).FullName;   
                visit.Id = _dbCrud.AddVisit(visit);
                await _dbCrud.Save();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
            return CreatedAtAction("GetVisit", new { id = visit.Id }, visit);
        }


        // PUT api/<VisitController>/5
        [HttpPut("{id}")]
        [Authorize(Roles = "Registrator, Doctor")]
        public async Task<IActionResult> PutVisit(int id, VisitDTO visit)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values.SelectMany(e => e.Errors.Select(e => e.ErrorMessage)));
            }

            if (id != visit.Id)
            {
                return BadRequest("Mismatched id");
            }

            try
            {
                _dbCrud.UpdateVisit(visit);
                await _dbCrud.Save();
            }
            catch (Exception e)
            {
                if (!_dbCrud.visitDTOs.Any(i => i.Id == id))
                {
                    return NotFound();
                }
                else
                {
                    BadRequest(e.Message);
                }
            }

            return CreatedAtAction("GetVisit", new { id = visit.Id }, visit);
        }

        // DELETE api/<VisitController>/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Registrator")]
        public async Task<IActionResult> Delete(int id)
        {
            var visit = await Task.Run(() => _dbCrud.visitDTOs.Find(i => i.Id == id));
            if (visit == null)
            {
                return NotFound($"Not found id {id}");
            }

            _dbCrud.DeleteVisit(id);
            await _dbCrud.Save();

            return Ok();
        }
    }
    
}
