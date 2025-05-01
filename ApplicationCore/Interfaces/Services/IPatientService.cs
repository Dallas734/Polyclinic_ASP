using Application.DTOs;

namespace Application.Interfaces.Services
{
    public interface IPatientService
    {
        List<PatientDTO> GetPatientsOnArea(int area_id);

        List<VisitDTO> GetPatientCard(int patientId);
    }
}
