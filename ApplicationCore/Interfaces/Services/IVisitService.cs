using Application.DTOs;

namespace Application.Interfaces.Services
{
    public interface IVisitService
    {
        bool CheckVisitAvailable(VisitDTO visit);

        List<VisitDTO> GetTalons(int doctorId, DateOnly date);

        List<VisitDTO> GetFutureVisitsOnPatientAndDate(PatientDTO patient, DateOnly date);

    }
}
