using Application.DTOs;

namespace Application.Interfaces.Services
{
    public interface IPatientService
    {
        int GetPatientArea(int patient_id);
        List<PatientDTO> GetPatientsOnArea(int area_id);

        List<VisitDTO> GetPatientCard(int patientId);
    }
}
