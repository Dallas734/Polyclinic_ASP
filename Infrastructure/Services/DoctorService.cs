using Application.DTOs;
using Application.Interfaces.Services;
using Application.Interfaces.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Services
{
    public class DoctorService : IDoctorService
    {
        IDbRepository dbContext;

        public DoctorService(IDbRepository repository)
        {
            dbContext = repository;
        }
        public List<DoctorDTO> GetDoctorsOnWork(List<DoctorDTO> doctors)
        {
            return doctors.Where(i => i.Status_id == 1).ToList();
        }
        public List<DoctorDTO> GetDoctorsOnAreaAndSpecialization(int area_id, int spec_id)
        {
            return dbContext.Doctors.GetAll().Where(i => i.SpecializationId == spec_id && i.AreaId == area_id).Select(i => new DoctorDTO(i)).ToList();
        }
    }
}
