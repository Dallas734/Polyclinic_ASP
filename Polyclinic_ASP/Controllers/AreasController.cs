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
    public class AreasController : ControllerBase
    {
        private IDbCrud _dbCrud;

        public AreasController(IDbCrud dbCrud)
        {
            _dbCrud = dbCrud;
        }

        // GET: api/<AreaController>
        [HttpGet]
        [Authorize(Roles = "Registrator, Doctor")]
        public async Task<ActionResult<IEnumerable<AreaDTO>>> GetAreas()
        {
            try
            {
                var areas = await Task.Run(() => _dbCrud.areaDTOs);
                return Ok(areas);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
