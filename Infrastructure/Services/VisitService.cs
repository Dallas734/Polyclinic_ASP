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
    public class VisitService : IVisitService
    {
        enum Days
        {
            
        }

        IDbRepository repos;

        public VisitService(IDbRepository repository)
        {
            repos = repository;
        }

        public bool CheckVisitAvailable(VisitDTO visit)
        {
            return true; 
        }

        public List<Talon> GetTalons(int doctorId, DateOnly date)
        {
            List<Talon> talons = new List<Talon>();
            TimeOnly? beginTime = new TimeOnly();
            TimeOnly? endTime = new TimeOnly();

            int num = (int)date.DayOfWeek;
            if (num == 0)
                num = 7;

            beginTime = repos.Shedules.GetAll().Where(i => i.DoctorId == doctorId && i.DayId == num).FirstOrDefault().BeginTime;
            endTime = repos.Shedules.GetAll().Where(i => i.DoctorId == doctorId && i.DayId == num).FirstOrDefault().EndTime;

            if (beginTime != endTime)
            {
                while (beginTime <= endTime)
                {
                    Talon talon = new Talon();
                    talon.Time = beginTime;
                    talon.Date = date;
                    if (repos.Visits.GetAll().Where(i => i.TimeT == talon.Time && i.DateT == date && i.VisitStatusId == 1 && i.DoctorId == doctorId).FirstOrDefault() != null)
                    {
                        VisitDTO visitDTO = new VisitDTO(repos.Visits.GetAll().Where(i => i.TimeT == talon.Time && i.DateT == date && i.VisitStatusId == 1 && i.DoctorId == doctorId).FirstOrDefault());
                        talon.Visit = visitDTO;
                        talon.Status = "Ожидает";
                    }

                    talons.Add(talon);
                    beginTime = new TimeOnly(beginTime.Value.Ticks + TimeSpan.FromMinutes(30).Ticks);
                }
            }

            return talons;
        }
        
        public List<VisitDTO> GetFutureVisitsOnPatientAndDate(PatientDTO patient, DateOnly date)
        {
            return repos.Visits.GetList().Where(
                          i => i.PatientId == patient.Id && i.DateT == date && i.VisitStatusId == 1).Select(i => new VisitDTO(i)).ToList();
        }

    }
}
