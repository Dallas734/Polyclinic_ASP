using Application.Interfaces.Repositories;
using Domain.DomainModels;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class CategoryRepositorySQL : IRepository<Category>
    {
        private PolyclinicKurContext dbContext;

        public CategoryRepositorySQL(PolyclinicKurContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public List<Category> GetList()
        {
            return dbContext.Categories.ToList();
        }
        public IEnumerable<Category> GetAll()
        {
            return dbContext.Categories;
        }

        public void Update(Category category)
        {
            dbContext.Entry(category).State = EntityState.Modified;
        }
        public void Delete(int id)
        {
            Category category = dbContext.Categories.Find(id);
            if (category != null)
                dbContext.Categories.Remove(category);
        }
        public Category GetItem(int id)
        {
            return dbContext.Categories.Find(id);
        }
        public int Create(Category category)
        {
            dbContext.Categories.Add(category);
            return category.Id;
        }
        public void Load()
        {
            dbContext.Categories.Load();
        }
        public void Include(string nameOfTable)
        {
            dbContext.Categories.Include(nameOfTable);
        }
    }
}
