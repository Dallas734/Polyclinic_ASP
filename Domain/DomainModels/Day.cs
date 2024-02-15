using System;
using System.Collections.Generic;

namespace Domain.DomainModels;

public partial class Day
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<Shedule> Shedules { get; set; } = new List<Shedule>();
}
