using Application.DTOs;
using Application.Interfaces.Services;
using Application.Interfaces.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services
{
    public class SheduleService : ISheduleService
    {
        IDbRepository dbContext;

        public SheduleService(IDbRepository repository)
        {
            dbContext = repository;
        }
        public List<SheduleDTO> GetSheduleOnDoctor(DoctorDTO doctor)
        {
            List<SheduleDTO> times = dbContext.Shedules.GetAll()
              .Join(dbContext.Days.GetAll(), s => s.DayId, d => d.Id, (s, d) => new {s.Id, DayName = d.Name, s.BeginTime, s.EndTime, s.DoctorId })
              .Where(o => o.DoctorId == doctor.Id && o.BeginTime != null && o.EndTime != null)
              .Select(o => new SheduleDTO { newBeginTime = o.BeginTime, newEndTime = o.EndTime,
                  Id = o.Id, DayName = o.DayName, BeginTime = o.BeginTime, EndTime = o.EndTime })
              .ToList();

            return times;
        }
    }
}
