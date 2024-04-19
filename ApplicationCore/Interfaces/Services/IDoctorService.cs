using Application.DTOs;

namespace Application.Interfaces.Services
{
    public interface IDoctorService
    {
        List<DoctorDTO> GetDoctorsOnWork();
        List<DoctorDTO> GetDoctorsOnAreaAndSpecialization(int area_id, int spec_id);
    }
}
