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

                workload = countVisits != 0 ? Math.Round((double)countAreaVisits / countVisits, 2) : 0;

                report.Add(new WorkloadAreaReportModel { Area = area, Workload = workload});
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

                workload = visitCount != 0 ? Math.Round((double)countDoctorVisits / visitCount, 2) : 0;

                report.Add(new WorkloadDoctorReportModel() { Doctor =  doctor, Workload = workload });
            }

            return report;
            
        }

        public List<WorkloadDiagnosisReportModel> MakeWorkloadDiagnosisReport(DateOnly begin, DateOnly end, int doctorId)
        {
            if (begin > end)
                throw new Exception("Начальная дата не должна быть больше конечной!");

            double workload = 0.0;

            List<WorkloadDiagnosisReportModel> report = new List<WorkloadDiagnosisReportModel>();

            List<Visit> visits = dbContext.Visits.Where(v => v.DateT >= begin && v.DateT <= end && v.DoctorId == doctorId).ToList();

            int visitCount = visits.Count();

            List<Diagnosis> diagnoses = dbContext.Diagnoses.ToList();

            List<Diagnosis> curDiagnoses = new List<Diagnosis>();

            foreach (Diagnosis diagnosis in diagnoses)
            {
                if (visits.Any(v => v.DiagnosisId == diagnosis.Id)) curDiagnoses.Add(diagnosis);
            }

            foreach (Diagnosis diagnosis in curDiagnoses)
            {
                int diagnosisCount = visits.Where(v => v.DiagnosisId == diagnosis.Id).Count();

                workload = visitCount != 0 ? Math.Round((double)diagnosisCount / visitCount, 2) : 0;
                
                report.Add(new WorkloadDiagnosisReportModel() { Name = diagnosis.Name, Workload = workload });
            }

            return report;
        }

    }
}
