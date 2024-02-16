using Application.DTOs;
using Application.Interfaces.Services;
using Domain.DomainModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Polyclinic_ASP.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorController : ControllerBase
    {
        private IDbCrud _dbCrud;
        private IDoctorService _doctorService;
        public DoctorController(IDbCrud dbCrud, IDoctorService doctorService) 
        {
            _dbCrud = dbCrud;
            _doctorService = doctorService;
        }

        // GET: api/<DoctorController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DoctorDTO>>> GetDoctors()
        {
            try
            {
                var doctors = await Task.Run(() => _dbCrud.doctorDTOs);
                //if (doctors.Count == 0) return NotFound();

                return Ok(doctors);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET api/<DoctorController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DoctorDTO>> GetDoctor(int id)
        {
            var doctor = await Task.Run(() => _dbCrud.doctorDTOs.FirstOrDefault(i => i.Id == id));

            if (doctor == null)
            {
                return NotFound();
            }

            return Ok(doctor);
        }

        //  GET api/<DoctorController>/DoctorsOnWork
        [HttpGet("DoctorsOnWork")]
        public async Task<ActionResult<IEnumerable<DoctorDTO>>> GetDoctorsOnWork()
        {
            try
            {
                var doctors = await Task.Run(() => _doctorService.GetDoctorsOnWork());

                return Ok(doctors);
            }
            catch(Exception e)
            {
               return BadRequest(e.Message);
            }
        }

        [HttpGet("byAreaAndSpec")]
        public async Task<ActionResult<IEnumerable<DoctorDTO>>> GetDoctorsByAreaAndSpec(int areaId, int specId)
        {
            try
            {
                var doctors = await Task.Run(() => _doctorService.GetDoctorsOnAreaAndSpecialization(areaId, specId));

                return Ok(doctors);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/<DoctorController>
        [HttpPost]
        public async Task<ActionResult<DoctorDTO>> PostDoctor(DoctorDTO doctor)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values.SelectMany(e => e.Errors.Select(e => e.ErrorMessage)));
            }

            try
            {
                if (doctor.Area_id == 0) doctor.Area_id = null;
                _dbCrud.AddDoctor(doctor);
                await _dbCrud.Save();
            }
            catch (Exception)
            {
                return BadRequest();
            }

            return CreatedAtAction("GetDoctor", new { id = doctor.Id }, doctor);
        }

        // PUT api/<DoctorController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDoctor(int id, DoctorDTO doctor)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values.SelectMany(e => e.Errors.Select(e => e.ErrorMessage)));
            }

            if (id !=  doctor.Id)
            {
                return BadRequest("Mismatched id");  
            }

            try
            {
                if (doctor.Area_id == 0) doctor.Area_id = null;
                _dbCrud.UpdateDoctor(doctor);
                await _dbCrud.Save();
            }
            catch (Exception e)
            {
                if (!_dbCrud.doctorDTOs.Any(i => i.Id == id))
                {
                    return NotFound();
                }
                else
                {
                    BadRequest(e.Message);
                }
            }

            return CreatedAtAction("GetDoctor", new { id = doctor.Id }, doctor);
        }

        // DELETE api/<DoctorController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var doctor = await Task.Run(() => _dbCrud.doctorDTOs.Find(i => i.Id == id));
            if (doctor == null)
            {
                return NotFound($"Not found id {id}");
            }

            _dbCrud.DeleteDoctor(id);
            await _dbCrud.Save();

            return Ok();
        }
    }
}
