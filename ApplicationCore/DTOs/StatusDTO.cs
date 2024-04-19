using Domain.DomainModels;

namespace Application.DTOs
{
    public class StatusDTO
    {
        public StatusDTO()
        {

        }

        public StatusDTO(Status s)
        {
            Id = s.Id;
            Name = s.Name;
        }

        public int Id { get; set; }

        public string Name { get; set; }

    }
}
