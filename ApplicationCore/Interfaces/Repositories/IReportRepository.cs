using Domain.ReportModels;


namespace Application.Interfaces.Repositories
{
    public interface IReportRepository
    {
        List<WorkloadAreaReportModel> MakeWorkLoadAreaReport(DateOnly begin, DateOnly end);
        // List<Report> MakeDiagnosisReport(int doctor_id, DateTime begin, DateTime end);
    }
}
