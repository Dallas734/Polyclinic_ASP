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
        public DoctorController(IDbCrud dbCrud) 
        {
            _dbCrud = dbCrud;
        }

        // GET: api/<DoctorController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DoctorDTO>>> GetDoctors()
        {
            try
            {
                var doctors = await Task.Run(() => _dbCrud.doctorDTOs);
                if (doctors == null) return NotFound();

                return Ok(doctors);
            }
            catch (NullReferenceException)
            {
                return BadRequest();
            }
        }

        // GET api/<DoctorController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DoctorDTO>> GetDoctor(int id)
        {
            var doctor = await Task.Run(() => _dbCrud.doctorDTOs.Where(i => i.Id == id));

            if (doctor == null)
            {
                return NotFound();
            }

            return Ok(doctor);
        }

        // POST api/<DoctorController>
        [HttpPost]
        public async Task<ActionResult<DoctorDTO>> PostDoctor(DoctorDTO doctor)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            try
            {
                if (doctor.Area_id == 0) doctor.Area_id = null; 
                await Task.Run(() => _dbCrud.AddDoctor(doctor));
                _dbCrud.Save();
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
            if (id !=  doctor.Id)
            {
                return BadRequest();  
            }

            try
            {
                if (doctor.Area_id == 0) doctor.Area_id = null;
                await Task.Run(() => _dbCrud.UpdateDoctor(doctor));
                _dbCrud.Save();
            }
            catch (Exception)
            {
                if (!_dbCrud.doctorDTOs.Any(i => i.Id == id))
                {
                    return NotFound();
                }
                else
                {
                    BadRequest();
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
                return NotFound(id);
            }

            await Task.Run(() => _dbCrud.DeleteDoctor(id));
            _dbCrud.Save();

            return Ok();
        }
    }
}
