using Domain.DomainModels;

namespace Domain.ReportModels
{
    public class WorkloadDoctorReportModel
    {
        public Doctor Doctor { get; set; } = null!;

        public string Name { get; set; } = null!;

        public double Workload {  get; set; }
    }
}
