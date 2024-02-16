using System;
using System.Collections.Generic;

namespace Domain.DomainModels;

public partial class Area
{
    public int Id { get; set; }

    public string Type { get; set; } = null!;

    public virtual ICollection<Doctor> Doctors { get; set; } = new List<Doctor>();

    public virtual ICollection<Patient> Patients { get; set; } = new List<Patient>();
}
