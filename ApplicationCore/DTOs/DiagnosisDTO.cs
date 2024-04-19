using Domain.DomainModels;

namespace Application.DTOs
{
    public class DiagnosisDTO
    {
        public DiagnosisDTO()
        {
        }

        public DiagnosisDTO(Diagnosis d)
        {
            Id = d.Id;
            Name = d.Name;
        }
        public int Id { get; set; }

        public string Name { get; set; }

    }
}
