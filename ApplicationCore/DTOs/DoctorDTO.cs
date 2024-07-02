using Domain.DomainModels;

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
            /*SpecializationId = d.SpecializationId;*/
            Specialization = new SpecializationDTO(d.Specialization);
            LastName = d.LastName;
            FirstName = d.FirstName;
            Surname = d.Surname;
            /*GenderId = d.GenderId;*/
            Gender = new GenderDTO(d.Gender);
            DateOfBirth = d.DateOfBirth;
            /*StatusId = d.StatusId;
            AreaId = d.AreaId;
            CategoryId = d.CategoryId;*/
            Status = new StatusDTO(d.Status);
            Area = new AreaDTO(d.Area);
            FullName = d.LastName + " " + d.FirstName + " " + d.Surname;
            /*SpecializationName = d.Specialization.Name;
            StatusName = d.Status.Name;
            CategoryName = d.Category.Name;
            GenderName = d.Gender.Name;*/
            Category = new CategoryDTO(d.Category);
            Gender = new GenderDTO(d.Gender);

        }

        public int Id { get; set; }

        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string Surname { get; set; }

        public string? FullName { get; set; }

        public DateOnly DateOfBirth { get; set; }

       /* public int SpecializationId { get; set; }

        public string? SpecializationName { get; set; }*/

        public SpecializationDTO Specialization { get; set; }

        /*public int StatusId { get; set; }

        public string? StatusName { get; set; }*/

        public StatusDTO Status { get; set; }

        // public int? AreaId { get; set; }

        public AreaDTO Area { get; set; }

        /*public int CategoryId { get; set; }

        public string? CategoryName { get; set; }*/

        public CategoryDTO Category { get; set; }

        /*public int GenderId { get; set; }

        public string? GenderName { get; set; }*/

        public GenderDTO Gender { get; set; }
    }
}
