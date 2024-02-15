using System;
using System.Collections.Generic;

namespace Domain.DomainModels;

public partial class Procedure
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<Visit> Visits { get; set; } = new List<Visit>();
}
