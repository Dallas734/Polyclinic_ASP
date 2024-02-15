using System;
using System.Collections.Generic;

namespace Domain.DomainModels;

public partial class PatientView
{
    public short Id { get; set; }

    public string Concat { get; set; } = null!;
}
