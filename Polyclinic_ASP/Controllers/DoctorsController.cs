using Application.DTOs;
using Application.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace Polyclinic_ASP.Controllers
{
    [Route("api/[controller]")]
    [EnableCors]
    [ApiController]
    public class DoctorsController : ControllerBase
    {
        private IDbCrud _dbCrud;
        private IDoctorService _doctorService;
        public DoctorsController(IDbCrud dbCrud, IDoctorService doctorService)
        {
            _dbCrud = dbCrud;
            _doctorService = doctorService;
        }

        // GET: api/<DoctorController>
        [HttpGet]
        [Authorize(Roles = "Registrator, Doctor")]
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
        [Authorize(Roles = "Registrator, Doctor")]
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
        [Authorize(Roles = "Registrator")]
        public async Task<ActionResult<IEnumerable<DoctorDTO>>> GetDoctorsOnWork()
        {
            try
            {
                var doctors = await Task.Run(() => _doctorService.GetDoctorsOnWork());

                return Ok(doctors);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("byAreaAndSpec")]
        [Authorize(Roles = "Registrator")]
        public async Task<ActionResult<IEnumerable<DoctorDTO>>> GetDoctorsByAreaAndSpec(int areaId, int specId)
        {
            try
            {
                var doctors = await Task.Run(() => _doctorService.GetDoctorsOnAreaAndSpecialization(areaId, specId));

                return Ok(doctors);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/<DoctorController>
        [HttpPost]
        [Authorize(Roles = "Registrator")]
        public async Task<ActionResult<DoctorDTO>> PostDoctor(DoctorDTO doctor)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values.SelectMany(e => e.Errors.Select(e => e.ErrorMessage)));
            }

            try
            {
                doctor.Specialization = _dbCrud.specializationDTOs.Find(i => i.Id == doctor.Specialization.Id);
                doctor.Category = _dbCrud.categoryDTOs.Find(i => i.Id == doctor.Category.Id);
                doctor.Status = _dbCrud.statusDTOs.Find(i => i.Id == doctor.Status.Id);
                doctor.Gender = _dbCrud.genderDTOs.Find(i => i.Id == doctor.Gender.Id);
                if (doctor.Area == null) doctor.Area = null;
                doctor.Id = _dbCrud.AddDoctor(doctor);
                await _dbCrud.Save();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

            return CreatedAtAction("GetDoctor", new { id = doctor.Id }, doctor);
        }

        // PUT api/<DoctorController>/5
        [HttpPut("{id}")]
        [Authorize(Roles = "Registrator")]
        public async Task<IActionResult> PutDoctor(int id, DoctorDTO doctor)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values.SelectMany(e => e.Errors.Select(e => e.ErrorMessage)));
            }

            if (id != doctor.Id)
            {
                return BadRequest("Mismatched id");
            }

            try
            {
                doctor.Specialization = _dbCrud.specializationDTOs.Find(i => i.Id == doctor.Specialization.Id);
                doctor.Category = _dbCrud.categoryDTOs.Find(i => i.Id == doctor.Category.Id);
                doctor.Status = _dbCrud.statusDTOs.Find(i => i.Id == doctor.Status.Id);
                doctor.Gender = _dbCrud.genderDTOs.Find(i => i.Id == doctor.Gender.Id);
                if (doctor.Area == null) doctor.Area = null;
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
        [Authorize(Roles = "Registrator")]
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
