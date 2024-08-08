using Domain.ReportModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs
{
    public class WorkloadDiagnosisReportDTO
    {
        public WorkloadDiagnosisReportDTO(WorkloadDiagnosisReportModel model)
        {
            Name = model.Name;
            Workload = model.Workload;
        }

        public string Name { get; set; }

        public double Workload {  get; set; }
    }
}
