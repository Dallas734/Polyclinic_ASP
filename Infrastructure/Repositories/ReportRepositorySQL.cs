using Application.Interfaces.Repositories;
using Domain.DomainModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class ReportRepositorySQL : IReportRepository
    {
        private PolyclinicKurContext dbContext;

        public ReportRepositorySQL(PolyclinicKurContext dbContext)
        {
            this.dbContext = dbContext;
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
