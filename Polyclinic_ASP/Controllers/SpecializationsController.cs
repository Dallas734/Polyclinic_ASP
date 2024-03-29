﻿using Application.DTOs;
using Application.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace Polyclinic_ASP.Controllers
{
    [Route("api/[controller]")]
    [EnableCors]
    [ApiController]
    public class SpecializationsController : ControllerBase
    {
        private IDbCrud _dbCrud;

        public SpecializationsController(IDbCrud dbCrud)
        {
            _dbCrud = dbCrud;
        }
        // GET: api/<SpecializationController>
        [HttpGet]
        [Authorize(Roles = "Registrator, Doctor")]
        public async Task<ActionResult<IEnumerable<SpecializationDTO>>> GetSpecs()
        {
            try
            {
                var specs = await Task.Run(() => _dbCrud.specializationDTOs);
                return Ok(specs);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
