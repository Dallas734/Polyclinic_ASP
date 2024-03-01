using System;
using System.Collections.Generic;

namespace Domain.DomainModels;

public partial class User
{
    public int Id { get; set; }

    public string Login { get; set; } = null!;

    public string Password { get; set; } = null!;

    public int? DoctorId { get; set; }

    public int RoleId { get; set; }

    public virtual Doctor? Doctor { get; set; }

    public virtual Role Role { get; set; } = null!;
}
