﻿using Application.DTOs;
using Application.Interfaces.Services;
using Domain.DomainModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using System.Numerics;

namespace Polyclinic_ASP.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientController : ControllerBase
    {
        private IDbCrud _dbCrud;
        private IPatientService _patientService;
        public PatientController(IDbCrud dbCrud, IPatientService patientService)
        {
            _dbCrud = dbCrud;
            _patientService = patientService;
        }

        // GET: api/<PatientController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PatientDTO>>> GetPatients()
        {
            try
            {
                var patients = await Task.Run(() => _dbCrud.patientDTOs);
                return Ok(patients);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET api/<PatientController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PatientDTO>> GetPatient(int id)
        {
            var patient = await Task.Run(() => _dbCrud.patientDTOs.FirstOrDefault(i => i.Id == id));

            if (patient == null)
            {
                return NotFound();
            }

            return Ok(patient);
        }

        [HttpGet("byArea")]
        public async Task<ActionResult<IEnumerable<PatientDTO>>> GetPatientsByArea(int areaId)
        {
            try
            {
                var patients = await Task.Run(() => _patientService.GetPatientsOnArea(areaId));

                return Ok(patients);
            }
            catch(Exception e)
            {
               return BadRequest(e.Message);
            }
        }

        // POST api/<PatientController>
        [HttpPost]
        public async Task<ActionResult<PatientDTO>> PostPatient(PatientDTO patient)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values.SelectMany(e => e.Errors.Select(e => e.ErrorMessage)));
            }

            try
            {
                patient.GenderName = _dbCrud.genderDTOs.Find(i => i.Id == patient.GenderId).Name;
                if (patient.AreaId == 0) patient.AreaId = null;
                patient.Id = _dbCrud.AddPatient(patient);
                await _dbCrud.Save();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

            return CreatedAtAction("GetPatient", new { id = patient.Id }, patient);
        }

        // PUT api/<PatientController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPatient(int id, PatientDTO patient)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values.SelectMany(e => e.Errors.Select(e => e.ErrorMessage)));
            }

            if (id != patient.Id)
            {
                return BadRequest("Mismatched id");
            }

            try
            {
                patient.GenderName = _dbCrud.genderDTOs.Find(i => i.Id == patient.GenderId).Name;
                if (patient.AreaId == 0) patient.AreaId = null;
                _dbCrud.UpdatePatient(patient);
                await _dbCrud.Save();
            }
            catch (Exception e)
            {
                if (!_dbCrud.patientDTOs.Any(i => i.Id == id))
                {
                    return NotFound();
                }
                else
                {
                    BadRequest(e.Message);
                }
            }

            return CreatedAtAction("GetPatient", new { id = patient.Id }, patient);
        }

        // DELETE api/<PatientController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var patient = await Task.Run(() => _dbCrud.patientDTOs.Find(i => i.Id == id));
            if (patient == null)
            {
                return NotFound($"Not found id {id}");
            }

            _dbCrud.DeletePatient(id);
            await _dbCrud.Save();

            return Ok();
        }
    }
}
