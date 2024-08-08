using Domain.ReportModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs
{
    public class WorkloadDoctorReportDTO
    {
        public WorkloadDoctorReportDTO(WorkloadDoctorReportModel model)
        {
            doctor = new DoctorDTO(model.Doctor);
            Workload = model.Workload;
            Name = doctor.FullName;
        }

        public DoctorDTO doctor { get; set; }

        public string? Name { get; set; }

        public double Workload {  get; set; }
    }
}
