using Domain.DomainModels;

namespace Application.DTOs
{
    public class Talon
    {
        public Talon()
        {
        }
        public TimeOnly? Time { get; set; }
        public DateOnly Date { get; set; }
        public string Status { get; set; }
        public VisitDTO Visit { get; set; }
    }

    public class VisitDTO
    {
        public VisitDTO() { }

        public VisitDTO(Visit v)
        {
            Id = v.Id;
            PatientId = v.PatientId;
            Diagnosis = v.Diagnosis == null ? null : new DiagnosisDTO(v.Diagnosis);
            Recipe = v.Recipe;
            Procedure = v.Procedure == null ? null : new ProcedureDTO(v.Procedure); ;
            DateT = v.DateT;
            TimeT = v.TimeT;
            DoctorId = v.DoctorId;
            VisitStatusId = v.VisitStatusId;
            if (v.Doctor != null)
            {
                DoctorFullName = v.Doctor.LastName + " " + v.Doctor.FirstName + " " + v.Doctor.Surname;
                Specialization = new SpecializationDTO(v.Doctor.Specialization);
            }
            if (v.Patient != null)
                PatientFullName = v.Patient.LastName + " " + v.Patient.FirstName + " " + v.Patient.Surname;
        }
        public int Id { get; set; }

        public int? PatientId { get; set; }

        public string? PatientFullName { get; set; }

        public DiagnosisDTO? Diagnosis { get; set; }

        public string? Recipe { get; set; }

        public ProcedureDTO? Procedure { get; set; }

        public DateOnly? DateT { get; set; }

        public TimeOnly? TimeT { get; set; }

        public int? DoctorId { get; set; }

        public SpecializationDTO? Specialization { get; set; }

        public string? DoctorFullName { get; set; }

        public int? VisitStatusId { get; set; }

        public string? VisitStatusName { get; set; }
    }
}
