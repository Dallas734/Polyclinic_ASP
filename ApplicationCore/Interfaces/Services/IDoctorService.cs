using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.DTOs;

namespace Application.Interfaces.Services
{
    public interface IDoctorService
    {
        List<DoctorDTO> GetDoctorsOnWork(List<DoctorDTO> doctors);
        List<DoctorDTO> GetDoctorsOnAreaAndSpecialization(int area_id, int spec_id);
    }
}
