using Domain.DomainModels;

namespace Application.DTOs
{
    public class VisitStatusDTO
    {
        public VisitStatusDTO() { }

        public VisitStatusDTO(VisitStatus visitStatus)
        {
            Id = visitStatus.Id;
            Name = visitStatus.Name;
        }

        public int Id { get; set; }

        public string Name { get; set; }

    }
}
