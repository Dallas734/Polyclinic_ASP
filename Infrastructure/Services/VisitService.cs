using Application.DTOs;
using Application.Interfaces.Repositories;
using Application.Interfaces.Services;
using Domain.DomainModels;

namespace BLL.Services
{
    public class VisitService : IVisitService
    {
        IDbRepository repos;

        public VisitService(IDbRepository repository)
        {
            repos = repository;
        }

        public int AddVisit(VisitDTO visit)
        {
            return repos.Visits.Create(new Visit()
            {
                DateT = visit.DateT,
                TimeT = visit.TimeT,
                DoctorId = visit.Doctor.Id,
                PatientId = visit.Patient.Id,
                DiagnosisId = visit.Diagnosis == null ? null : visit.Diagnosis.Id,
                ProcedureId = visit.Procedure == null ? null : visit.Procedure.Id,
                VisitStatusId = 1
            });
        }

        public void DeleteVisit(int id)
        {
            repos.Visits.Delete(id);
        }

        public void CompleteVisit(VisitDTO visit)
        {
            if (visit != null)
            {
                Visit v = repos.Visits.GetItem(visit.Id);
                v.ProcedureId = visit.Procedure == null || visit.Procedure.Id == 0 ? null : visit.Procedure.Id;
                v.DiagnosisId = visit.Diagnosis == null || visit.Diagnosis.Id == 0 ? null : visit.Diagnosis.Id;
                v.Recipe = visit.Recipe;
                v.VisitStatusId = 2;
                v.DateT = visit.DateT;
                v.TimeT = visit.TimeT;
                v.DoctorId = visit.Doctor?.Id;
                v.PatientId = visit.Patient?.Id;

                repos.Visits.Update(v);
            }
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
