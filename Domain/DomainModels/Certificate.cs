using System;
using System.Collections.Generic;

namespace Domain.DomainModels;

public partial class Certificate
{
    public int Id { get; set; }

    public int DoctorId { get; set; }

    public string RegNum { get; set; } = null!;

    public DateOnly Issue { get; set; }

    public DateOnly Expiration { get; set; }

    public virtual Doctor Doctor { get; set; } = null!;
}
