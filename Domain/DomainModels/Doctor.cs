using System;
using System.Collections.Generic;

namespace Domain.DomainModels;

public partial class Doctor
{
    public int Id { get; set; }

    public int SpecializationId { get; set; }

    public string LastName { get; set; } = null!;

    public string FirstName { get; set; } = null!;

    public string Surname { get; set; } = null!;

    public DateOnly DateOfBirth { get; set; }

    public int StatusId { get; set; }

    public int? AreaId { get; set; }

    public int CategoryId { get; set; }

    public int GenderId { get; set; }

    public virtual Area? Area { get; set; }

    public virtual Category Category { get; set; } = null!;

    public virtual ICollection<Certificate> Certificates { get; set; } = new List<Certificate>();

    public virtual Gender Gender { get; set; } = null!;

    public virtual ICollection<Shedule> Shedules { get; set; } = new List<Shedule>();

    public virtual Specialization Specialization { get; set; } = null!;

    public virtual Status Status { get; set; } = null!;

    public virtual ICollection<Visit> Visits { get; set; } = new List<Visit>();
}
