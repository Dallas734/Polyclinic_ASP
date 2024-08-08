using Domain.ReportModels;


namespace Application.Interfaces.Repositories
{
    public interface IReportRepository
    {
        List<WorkloadAreaReportModel> MakeWorkLoadAreaReport(DateOnly begin, DateOnly end);
        List<WorkloadDoctorReportModel> MakeWorkloadDoctorReport(DateOnly begin, DateOnly end, int specId);
        List<WorkloadDiagnosisReportModel> MakeWorkloadDiagnosisReport(DateOnly begin, DateOnly end, int doctorId);
        // List<Report> MakeDiagnosisReport(int doctor_id, DateTime begin, DateTime end);
    }
}
