using Domain.DomainModels;

namespace Application.DTOs
{
    public class ProcedureDTO
    {
        public ProcedureDTO()
        {

        }

        public ProcedureDTO(Procedure p)
        {
            Id = p.Id;
            Name = p.Name;
        }

        public int Id { get; set; }

        public string Name { get; set; }

    }
}
