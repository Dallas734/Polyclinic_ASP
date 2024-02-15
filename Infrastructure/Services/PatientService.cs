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
    public class PatientService : IPatientService
    {
        IDbRepository dbContext;

        public PatientService(IDbRepository repository)
        {
            dbContext = repository;
        }

        public int GetPatientArea(int patient_id)
        {
            return 1;
        }
        public List<PatientDTO> GetPatientsOnArea(int area_id)
        {
            return dbContext.Patients.GetAll().Join(dbContext.Addresses.GetAll().Where(a => a.AreaId == area_id), p => p.AddressId, a => a.Id, (p, a) => p).Select(i => new PatientDTO(i)).ToList();
        }

        public List<VisitDTO> GetPatientCard(PatientDTO patient)
        {
            return dbContext.Visits.GetAll().Where(i => i.PatientId == patient.Id && i.VisitStatusId == 2).Select(i => new VisitDTO(i)).ToList();
        }
    }
}
