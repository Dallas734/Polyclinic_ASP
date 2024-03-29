﻿using Domain.DomainModels;
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
            Day = new DayDTO(s.Day);
            DoctorId = s.DoctorId;
            BeginTime = s.BeginTime;
            EndTime = s.EndTime;
        }
        public int Id { get; set; }

        public DayDTO Day { get; set; }

        public int DoctorId { get; set; }

        public TimeOnly? BeginTime { get; set; }

        public TimeOnly? EndTime { get; set; }

    }
}
