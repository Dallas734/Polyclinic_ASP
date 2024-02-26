using System;
using System.Collections.Generic;

namespace Domain.DomainModels;

public partial class Visit
{
    public int Id { get; set; }

    public int? PatientId { get; set; }

    public int? DiagnosisId { get; set; }

    public string? Recipe { get; set; }

    public int? ProcedureId { get; set; }

    public DateOnly? DateT { get; set; }

    public TimeOnly? TimeT { get; set; }

    public int? DoctorId { get; set; }

    public int? VisitStatusId { get; set; }

    public virtual Diagnosis? Diagnosis { get; set; }

    public virtual Doctor? Doctor { get; set; }

    public virtual Patient? Patient { get; set; }

    public virtual Procedure? Procedure { get; set; }

    public virtual VisitStatus? VisitStatus { get; set; }
}
