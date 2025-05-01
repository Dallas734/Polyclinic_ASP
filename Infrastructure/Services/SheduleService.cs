using Application.DTOs;
using Application.Interfaces.Repositories;
using Application.Interfaces.Services;

namespace BLL.Services
{
    public class SheduleService : ISheduleService
    {
        IDbRepository dbContext;

        public SheduleService(IDbRepository repository)
        {
            dbContext = repository;
        }
        public List<SheduleDTO> GetSheduleOnDoctor(int doctorId)
        {
            List<SheduleDTO> times = dbContext.Shedules.GetAll()
                .Where(s => s.DoctorId == doctorId)
                .Select(s => new SheduleDTO(s))
                .ToList();

            return times;
        }
    }
}
