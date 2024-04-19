using Domain.DomainModels;

namespace Application.DTOs
{
    public class DayDTO
    {
        public DayDTO()
        {
        }
        public DayDTO(Day d)
        {
            Id = d.Id;
            Name = d.Name;
        }
        public int Id { get; set; }

        public string Name { get; set; }

    }
}
