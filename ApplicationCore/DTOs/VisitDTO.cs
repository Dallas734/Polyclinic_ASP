using Domain.DomainModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

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
            DiagnosisId = v.DiagnosisId;
            Recipe = v.Recipe;
            ProcedureId = v.ProcedureId;
            DateT = v.DateT;
            TimeT = v.TimeT;
            DoctorId = v.DoctorId;
            VisitStatusId = v.VisitStatusId;
            if (v.Doctor != null) 
                DoctorFullName = v.Doctor.LastName + " " + v.Doctor.FirstName + " " + v.Doctor.Surname;
            if (v.Patient != null)
                PatientFullName = v.Patient.LastName + " " + v.Patient.FirstName + " " + v.Patient.Surname;
            //Diagnosis = new DiagnosisDTO(v.Diagnosis);
            //Procedure = new ProcedureDTO(v.Procedure);
        }
        public int Id { get; set; }

        public int? PatientId { get; set; }

        public string? PatientFullName { get; set; }

        public int? DiagnosisId { get; set; }

        public string? Recipe { get; set; }

        public int? ProcedureId { get; set; }

        public DateOnly? DateT { get; set; }

        public TimeOnly? TimeT { get; set; }

        public int? DoctorId { get; set; }

        public string? DoctorFullName { get; set; }

        public int? VisitStatusId { get; set; }

        public string? VisitStatusName { get; set; }

        //public DoctorDTO? Doctor { get; set; }

        //public DiagnosisDTO? Diagnosis { get; set; }

        //public ProcedureDTO? Procedure { get; set; }
    }
}
