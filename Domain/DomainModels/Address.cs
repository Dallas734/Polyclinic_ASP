using System;
using System.Collections.Generic;

namespace Domain.DomainModels;

public partial class Address
{
    public int Id { get; set; }

    public int? AreaId { get; set; }

    public string Name { get; set; } = null!;

    public virtual Area? Area { get; set; }

    public virtual ICollection<Patient> Patients { get; set; } = new List<Patient>();
}
