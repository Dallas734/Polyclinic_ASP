using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.DTOs;

namespace Application.Interfaces.Services
{
    public interface IVisitService
    {
        bool CheckVisitAvailable(VisitDTO visit);

        List<Talon> GetTalons(int doctorId, DateOnly date);

        List<VisitDTO> GetFutureVisitsOnPatientAndDate(PatientDTO patient, DateOnly date);

    }
}
