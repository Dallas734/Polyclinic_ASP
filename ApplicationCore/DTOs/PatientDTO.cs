using Domain.DomainModels;
using System.ComponentModel.DataAnnotations;

namespace Application.DTOs
{
    public class PatientDTO
    {
        public PatientDTO()
        {
        }

        public PatientDTO(Patient p)
        {
            Id = p.Id;
            LastName = p.LastName;
            FirstName = p.FirstName;
            Surname = p.Surname;
            FullName = p.LastName + " " + p.FirstName + " " + p.Surname;
            GenderId = p.GenderId;
            GenderName = p.Gender.Name;
            DateOfBirth = p.DateOfBirth;
            Address = p.Address;
            AreaId = p.AreaId;
            Polis = p.Polis;
            WorkPlace = p.WorkPlace;
        }

        public int Id { get; set; }

        public string LastName { get; set; }

        public string FirstName { get; set; }

        public string Surname { get; set; }

        public string? FullName { get; set; }

        public DateOnly DateOfBirth { get; set; }

        public string? Address { get; set; }

        public int? AreaId { get; set; }

        [MaxLength(16)]
        public string Polis { get; set; }

        public string WorkPlace { get; set; }

        public int GenderId { get; set; }

        public string? GenderName { get; set; }
    }
}
