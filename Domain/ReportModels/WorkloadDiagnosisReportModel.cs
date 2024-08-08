using Domain.DomainModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ReportModels
{
    public class WorkloadDiagnosisReportModel
    {
        public string Name { get; set; } = null!;

        public double Workload {  get; set; }
    }
}
