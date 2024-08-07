using Domain.ReportModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs
{
    public class WorkloadAreaReportDTO
    {
        public WorkloadAreaReportDTO() { }

        public WorkloadAreaReportDTO(WorkloadAreaReportModel model)
        {
            Area = new AreaDTO(model.Area);
            Workload = model.Workload;
        }

        public AreaDTO Area { get; set; } = null!;

        public double Workload { get; set; }
    }
}
