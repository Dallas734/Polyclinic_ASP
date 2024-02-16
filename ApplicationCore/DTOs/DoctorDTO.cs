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
            Specialization_id = d.SpecializationId;
            LastName = d.LastName;
            FirstName = d.FirstName;
            Surname = d.Surname;
            Gender_id = d.GenderId;
            DateOfBirth = d.DateOfBirth;
            Status_id = d.StatusId;
            Area_id = d.AreaId;
            Category_id = d.CategoryId;
            FullName = d.LastName + " " + d.FirstName + " " + d.Surname;
            SpecializationDTO = new SpecializationDTO(d.Specialization);
        }

        public int Id { get; set; }

        public int Specialization_id { get; set; }

        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string Surname { get; set; }

        public string? FullName { get; set; }

        public DateOnly DateOfBirth { get; set; }

        public SpecializationDTO? SpecializationDTO { get; set; }

        public int Status_id { get; set; }

        public int? Area_id { get; set; }

        public int Category_id { get; set; }

        public int Gender_id { get; set; }
    }
}
