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

        IDbRepository dbContext;

        public VisitService(IDbRepository repository)
        {
            dbContext = repository;
        }

        public bool CheckVisitAvailable(VisitDTO visit)
        {
            return true; 
        }

        public List<Talon> GetTalons(DoctorDTO doctor, DateOnly date)
        {
            List<Talon> talons = new List<Talon>();
            TimeOnly? beginTime = new TimeOnly();
            TimeOnly? endTime = new TimeOnly();

            int num = (int)date.DayOfWeek;
            if (num == 0)
                num = 7;

            beginTime = dbContext.Shedules.GetAll().Where(i => i.DoctorId == doctor.Id && i.DayId == num).FirstOrDefault().BeginTime;
            endTime = dbContext.Shedules.GetAll().Where(i => i.DoctorId == doctor.Id && i.DayId == num).FirstOrDefault().EndTime;

            if (beginTime != endTime)
            {
                while (beginTime <= endTime)
                {
                    Talon talon = new Talon();
                    talon.Time = beginTime;
                    talon.Date = date;
                    if (dbContext.Visits.GetAll().Where(i => i.TimeT == talon.Time && i.DateT == date && i.VisitStatusId == 1 && i.DoctorId == doctor.Id).FirstOrDefault() != null)
                    {
                        VisitDTO visitDTO = new VisitDTO(dbContext.Visits.GetAll().Where(i => i.TimeT == talon.Time && i.DateT == date && i.VisitStatusId == 1 && i.DoctorId == doctor.Id).FirstOrDefault());
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
            return dbContext.Visits.GetList().Where(
                          i => i.PatientId == patient.Id && i.DateT == date && i.VisitStatusId == 1).Select(i => new VisitDTO(i)).ToList();
        }

    }
}
