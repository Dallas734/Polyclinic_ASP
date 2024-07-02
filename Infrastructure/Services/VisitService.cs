using Application.DTOs;
using Application.Interfaces.Repositories;
using Application.Interfaces.Services;

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

        public List<VisitDTO> GetTalons(int doctorId, DateOnly date)
        {
            List<VisitDTO> talons = new List<VisitDTO>();
            TimeOnly? beginTime = new TimeOnly();
            TimeOnly? endTime = new TimeOnly();

            int num = (int)date.DayOfWeek;
            if (num == 0)
                num = 7;

            if (repos.Shedules.GetAll().Where(i => i.DoctorId == doctorId && i.DayId == num).FirstOrDefault() != null)
            {
                beginTime = repos.Shedules.GetAll().Where(i => i.DoctorId == doctorId && i.DayId == num).FirstOrDefault().BeginTime;
                endTime = repos.Shedules.GetAll().Where(i => i.DoctorId == doctorId && i.DayId == num).FirstOrDefault().EndTime;
            }

            if (beginTime != endTime)
            {
                while (beginTime <= endTime)
                {
                    VisitDTO visit = new VisitDTO();
                    visit.TimeT = beginTime;
                    visit.DateT = date;
                    if (repos.Visits.GetAll().Where(i => i.TimeT == visit.TimeT && i.DateT == date && i.VisitStatusId == 1 && i.DoctorId == doctorId).FirstOrDefault() != null)
                    {
                        visit = new VisitDTO(repos.Visits.GetAll().Where(i => i.TimeT == visit.TimeT && i.DateT == date && i.VisitStatusId == 1 && i.DoctorId == doctorId).FirstOrDefault());
                        //visit.TimeT = beginTime;
                        //visit.DateT = date;
                        //visit.VisitStatusName = "Ожидает";
                        //visit.DoctorFullName = new DoctorDTO(repos.Doctors.GetAll().Where(i => i.Id == doctorId).FirstOrDefault()).FullName;
                    }

                    talons.Add(visit);
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
