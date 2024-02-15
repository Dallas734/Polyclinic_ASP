using Domain.DomainModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs
{
    public class SheduleDTO
    {
        public SheduleDTO() { }
        public SheduleDTO(Shedule s)
        {
            Id = s.Id;
            DayId = s.DayId;
            DoctorId = s.DoctorId;
            BeginTime = s.BeginTime;
            EndTime = s.EndTime;
        }
        public int Id { get; set; }

        public int DayId { get; set; }

        public string DayName { get; set; }

        public int DoctorId { get; set; }

        public TimeOnly? BeginTime { get; set; }

        public TimeOnly? EndTime { get; set; }

        public TimeOnly? newBeginTime { get; set; }

        public TimeOnly? newEndTime { get; set; }

    }
}
