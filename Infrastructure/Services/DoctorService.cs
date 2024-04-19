using Application.DTOs;
using Application.Interfaces.Repositories;
using Application.Interfaces.Services;

namespace Infrastructure.Services
{
    public class DoctorService : IDoctorService
    {
        IDbRepository repos;

        public DoctorService(IDbRepository repository)
        {
            repos = repository;
        }
        public List<DoctorDTO> GetDoctorsOnWork()
        {
            return repos.Doctors.GetAll()
                .Where(i => i.StatusId == 1)
                .Select(i => new DoctorDTO(i))
                .ToList();
        }
        public List<DoctorDTO> GetDoctorsOnAreaAndSpecialization(int area_id, int spec_id)
        {
            return repos.Doctors.GetAll()
                .Where(i => (i.SpecializationId == spec_id && i.AreaId == area_id) ||
                (i.SpecializationId == spec_id && i.AreaId == null))
                .Select(i => new DoctorDTO(i)).ToList();
        }
    }
}
