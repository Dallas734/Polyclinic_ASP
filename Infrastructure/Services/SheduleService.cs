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
              /*.Join(dbContext.Days.GetAll(), s => s.DayId, d => d.Id, (s, d) => new {s.Id, DayName = d.Name, s.BeginTime, s.EndTime, s.DoctorId })
              .Where(o => o.DoctorId == doctorId && o.BeginTime != null && o.EndTime != null)
              .Select(o => new SheduleDTO { newBeginTime = o.BeginTime, newEndTime = o.EndTime,
                  Id = o.Id, DayName = o.DayName, DoctorId = o.DoctorId, BeginTime = o.BeginTime, EndTime = o.EndTime })*/
              .ToList();

            return times;
        }
    }
}
