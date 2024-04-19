using Application.DTOs;
using Application.Interfaces.Repositories;
using Application.Interfaces.Services;

namespace Infrastructure.Services
{
    public class PatientService : IPatientService
    {
        IDbRepository repos;

        public PatientService(IDbRepository repository)
        {
            repos = repository;
        }

        public int GetPatientArea(int patient_id)
        {
            return 1;
        }
        public List<PatientDTO> GetPatientsOnArea(int area_id)
        {
            return repos.Patients.GetAll()
                .Where(i => i.AreaId == area_id)
                .Select(i => new PatientDTO(i))
                .ToList();
        }

        public List<VisitDTO> GetPatientCard(int patientId)
        {
            return repos.Visits.GetAll().Where(i => i.PatientId == patientId && i.VisitStatusId == 2).Select(i => new VisitDTO(i)).ToList();
        }
    }
}
