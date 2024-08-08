using Application.DTOs;
using Application.Interfaces.Repositories;
using Application.Interfaces.Services;

namespace Infrastructure.Services
{
    public class ReportService : IReportService
    {
        IDbRepository repos;

        public ReportService(IDbRepository repos)
        {
            this.repos = repos;
        }

        public List<WorkloadAreaReportDTO> MakeWorkLoadAreaReport(DateOnly begin, DateOnly end)
        {
            return repos.Reports.MakeWorkLoadAreaReport(begin, end).Select(r => new WorkloadAreaReportDTO(r)).ToList();
        }

        public List<WorkloadDoctorReportDTO> MakeWorkloadDoctorReport(DateOnly begin, DateOnly end, int specId)
        {
            return repos.Reports.MakeWorkloadDoctorReport(begin, end, specId).Select(r => new WorkloadDoctorReportDTO(r)).ToList();
        }

        public List<WorkloadDiagnosisReportDTO> MakeWorkloadDiagnosisReport(DateOnly begin, DateOnly end, int doctorId)
        {
            return repos.Reports.MakeWorkloadDiagnosisReport(begin, end, doctorId).Select(r => new WorkloadDiagnosisReportDTO(r)).ToList();
        }

        /*public List<ReportModel> MakeWorkloadReport(int area_id, DateTime begin, DateTime end)
        {
            return dbContext.Reports.MakeWorkLoadReport(area_id, begin, end).Select(i => new ReportModel(i)).ToList();
        }

        public List<ReportModel> MakeDiagnosisReport(int doctor_id, DateTime begin, DateTime end)
        {
            return dbContext.Reports.MakeDiagnosisReport(doctor_id, begin, end).Select(i => new ReportModel(i)).ToList();
        }*/
    }
}
