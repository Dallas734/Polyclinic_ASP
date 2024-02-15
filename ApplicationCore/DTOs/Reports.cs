using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs
{
    public class SheduleReport
    {
        public string DayName { get; set; }
        public TimeSpan? BeginTime { get; set; }
        public TimeSpan? EndTime { get; set; }
    }

    public class VisitReport
    {
        public int PatientId { get; set; }
        public int? DiagnosisId { get; set; }
        public string Recipe { get; set; }
        public int? ProcedureId { get; set; }
        public DateTime? DateT { get; set; }
        public TimeSpan? TimeT { get; set; }
    }

    public class PatientCardReport
    {
        public short PatientId { get; set; }
        public short DoctorId { get; set; }
        public short SpecializationId { get; set; }
        public DateTime? DateT { get; set; }
        public short DiagnosisId { get; set; }
    }
}
