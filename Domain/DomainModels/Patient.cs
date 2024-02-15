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

    public int? AddressId { get; set; }

    public string Polis { get; set; } = null!;

    public string WorkPlace { get; set; } = null!;

    public int? GenderId { get; set; }

    public virtual Address? Address { get; set; }

    public virtual Gender? Gender { get; set; }

    public virtual ICollection<Visit> Visits { get; set; } = new List<Visit>();
}
