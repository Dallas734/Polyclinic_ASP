using Domain.DomainModels;

namespace Domain.ReportModels
{
    public class WorkloadAreaReportModel
    {
        public Area Area { get; set; } = null!;

        public double Workload { get; set; }
    }
}
