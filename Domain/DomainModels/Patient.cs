using System;
using System.Collections.Generic;

namespace Domain.DomainModels;

public partial class Patient
{
    public int Id { get; set; }

    public string LastName { get; set; } = null!;

    public string FirstName { get; set; } = null!;

    public string Surname { get; set; } = null!;

    public DateOnly DateOfBirth { get; set; }

    public string Polis { get; set; } = null!;

    public string WorkPlace { get; set; } = null!;

    public int GenderId { get; set; }

    public string? Address { get; set; }

    public int? AreaId { get; set; }

    public virtual Area? Area { get; set; }

    public virtual Gender Gender { get; set; } = null!;

    public virtual ICollection<Visit> Visits { get; set; } = new List<Visit>();
}
