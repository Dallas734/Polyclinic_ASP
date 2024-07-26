using Domain.DomainModels;

namespace Application.DTOs
{
    public class SheduleDTO
    {
        public SheduleDTO() { }
        public SheduleDTO(Shedule s)
        {
            Id = s.Id;
            Day = new DayDTO(s.Day);
            Doctor = new DoctorDTO(s.Doctor);
            BeginTime = s.BeginTime;
            EndTime = s.EndTime;
        }
        public int Id { get; set; }

        public DayDTO Day { get; set; }

        public DoctorDTO Doctor { get; set; }

        public TimeOnly? BeginTime { get; set; }

        public TimeOnly? EndTime { get; set; }

    }
}
