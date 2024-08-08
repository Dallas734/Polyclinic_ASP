using Application.Interfaces.Repositories;
using Domain.DomainModels;
using Domain.ReportModels;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class ReportRepositorySQL : IReportRepository
    {
        private PolyclinicKurContext dbContext;

        public ReportRepositorySQL(PolyclinicKurContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public List<WorkloadAreaReportModel> MakeWorkLoadAreaReport(DateOnly begin, DateOnly end)
        {
            if (begin > end)
                throw new Exception("Начальная дата не должна быть больше конечной!");

            double workload = 0.0;
            List<WorkloadAreaReportModel> report = new List<WorkloadAreaReportModel>();

            List<Area> areas = dbContext.Areas.ToList();
            int countVisits = dbContext.Visits.Where(v => v.DateT >= begin && v.DateT <= end).Count();
            foreach (Area area in areas)
            {
                int countAreaVisits = dbContext.Visits
                    .Where(v => v.Doctor != null ? v.DateT >= begin && v.DateT <= end && v.Doctor.AreaId == area.Id : false)
                    .Count();

                workload = countVisits != 0 ? (double)countAreaVisits / countVisits : 0;

                report.Add(new WorkloadAreaReportModel { Area = area, Workload = workload});

                /*List<Doctor> doctors = dbContext.Doctors
                    .Where(d => d.AreaId == area.Id)
                    .ToList();

                foreach (Doctor doctor in doctors)
                {
                    int doctorVisits = dbContext.Visits
                        .Where(v => v.Doctor != null ? v.DoctorId == doctor.Id && v.VisitStatusId == 2 : false )
                        .Count();
                    workload += doctorVisits;
                }*/
            }

            return report;
        }

        public List<WorkloadDoctorReportModel> MakeWorkloadDoctorReport(DateOnly begin, DateOnly end, int specId)
        {
            if (begin > end)
                throw new Exception("Начальная дата не должна быть больше конечной!");

            double workload = 0.0;

            List<WorkloadDoctorReportModel> report = new List<WorkloadDoctorReportModel>();

            List<Visit> visits = dbContext.Visits.Where(v => v.DateT >= begin && v.DateT <= end).ToList();

            int visitCount = visits.Count();

                      
            List<Doctor> doctors = dbContext.Doctors
                .Include(d => d.Specialization)
                .Include(d => d.Gender)
                .Include(d => d.Status)
                .Include(d => d.Area)
                .Include(d => d.Category)
                .Where(d => d.SpecializationId == specId)
                .ToList();

            foreach (Doctor doctor in doctors)
            {
                int countDoctorVisits = visits.Where(v => v.DoctorId == doctor.Id).Count();

                workload = visitCount != 0 ? (double)countDoctorVisits / visitCount : 0;

                report.Add(new WorkloadDoctorReportModel() { Doctor =  doctor, Workload = workload });
            }

            return report;
            
        }

        /*public List<Report> MakeWorkLoadReport(int area_id, DateTime begin, DateTime end)
        {
            if (begin > end)
                throw new Exception("Начальная дата не должна быть больше конечной!");

            double workload;
            List<Report> report = new List<Report>();

            int count = dbContext.Visits
                .Where(v => v.DateT >= begin && v.DateT <= end)
                .Join(dbContext.Doctors, v => v.DoctorId, d => d.Id, (v, d) => d)
                .Where(d => d.AreaId == area_id)
                .Count();

            List<Doctor> doctors = dbContext.Doctors.Where(d => d.AreaId == area_id).ToList();

            foreach(Doctor doctor in doctors)
            {
                int doctorVisitCount = dbContext.Visits
                    .Where(v => v.DateT >= begin && v.DateT <= end)
                    .Join(dbContext.Doctors, v => v.DoctorId, d => d.Id, (v, d) => d)
                    .Where(d => d.Id == doctor.Id)
                    .Count();

                if (count == 0)
                    workload = 0;
                else workload = Math.Round((double)doctorVisitCount / count, 2);

                report.Add(new Report()
                {
                    Name = doctor.LastName + " " + doctor.FirstName + " " + doctor.Surname,
                    Workload = workload   
                });
            }

            return report;
        }

        public List<Report> MakeDiagnosisReport(int doctor_id, DateTime begin, DateTime end)
        {
            if (begin > end)
                throw new Exception("Начальная дата не должна быть больше конечной!");

            double workload;
            List<Report> report = new List<Report>();

            int count = dbContext.Visits.Where(i => i.DoctorId == doctor_id && i.VisitStatusId == 2 && i.DateT >= begin && i.DateT <= end).Count();
            List<int> diagnosis_ids = dbContext.Visits.Where(i => i.DoctorId == doctor_id && i.VisitStatusId == 2 && i.DateT >= begin && i.DateT <= end).
                Select(i => (int)i.DiagnosisId).Distinct().ToList();

            foreach(int id in diagnosis_ids)
            {
                int diagnosisCount = dbContext.Visits.Where(i => i.DoctorId == doctor_id && i.VisitStatusId == 2 && i.DiagnosisId == id && i.DateT >= begin && i.DateT <= end).Count();
                if (count == 0)
                    workload = 0;
                else workload = Math.Round((double)diagnosisCount / count, 2);

                report.Add(new Report()
                {
                    Name = dbContext.Diagnoses.Where(i => i.Id == id).FirstOrDefault().Name,
                    Workload = workload
                });
            }

            return report;
        }*/
    }
}
