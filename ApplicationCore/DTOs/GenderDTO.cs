using Domain.DomainModels;

namespace Application.DTOs
{
    public class GenderDTO
    {
        public GenderDTO()
        {
        }
        public GenderDTO(Gender d)
        {
            Id = d.Id;
            Name = d.Name;
        }
        public int Id { get; set; }

        public string Name { get; set; }
    }
}
