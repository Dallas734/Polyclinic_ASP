using Domain.DomainModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs
{
    public class DoctorDTO
    {
        public DoctorDTO()
        {
        }
        public DoctorDTO(Doctor d)
        {
            Id = d.Id;
            SpecializationId = d.SpecializationId;
            LastName = d.LastName;
            FirstName = d.FirstName;
            Surname = d.Surname;
            GenderId = d.GenderId;
            DateOfBirth = d.DateOfBirth;
            StatusId = d.StatusId;
            AreaId = d.AreaId;
            CategoryId = d.CategoryId;
            FullName = d.LastName + " " + d.FirstName + " " + d.Surname;
            SpecializationName = d.Specialization.Name;
            StatusName = d.Status.Name;
            CategoryName = d.Category.Name;
            GenderName = d.Gender.Name;

        }

        public int Id { get; set; }

        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string Surname { get; set; }

        public string? FullName { get; set; }

        public DateOnly DateOfBirth { get; set; }

        public int SpecializationId { get; set; }

        public string? SpecializationName { get; set; }

        public int StatusId { get; set; }

        public string? StatusName { get; set; }

        public int? AreaId { get; set; }

        public int CategoryId { get; set; }

        public string? CategoryName { get; set; }

        public int GenderId { get; set; }

        public string? GenderName { get; set; }
    }
}
