namespace Domain.DomainModels;

public partial class Shedule
{
    public int Id { get; set; }

    public int DayId { get; set; }

    public int DoctorId { get; set; }

    public TimeOnly? BeginTime { get; set; }

    public TimeOnly? EndTime { get; set; }

    public virtual Day Day { get; set; } = null!;

    public virtual Doctor Doctor { get; set; } = null!;
}
