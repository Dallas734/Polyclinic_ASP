using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.DTOs;

namespace Application.Interfaces.Services
{
    public interface IPatientService
    {
        int GetPatientArea(int patient_id);
        List<PatientDTO> GetPatientsOnArea(int area_id);

        List<VisitDTO> GetPatientCard(PatientDTO patient);
    }
}
