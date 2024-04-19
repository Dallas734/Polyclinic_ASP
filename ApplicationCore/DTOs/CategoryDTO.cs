using Domain.DomainModels;

namespace Application.DTOs
{
    public class CategoryDTO
    {
        public CategoryDTO()
        {

        }

        public CategoryDTO(Category c)
        {
            Id = c.Id;
            Name = c.Name;
        }

        public int Id { get; set; }

        public string Name { get; set; }

    }
}
