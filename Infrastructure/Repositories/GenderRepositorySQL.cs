using Application.Interfaces.Repositories;
using Domain.DomainModels;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class GenderRepositorySQL : IRepository<Gender>
    {
        private PolyclinicKurContext dbContext;

        public GenderRepositorySQL(PolyclinicKurContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public List<Gender> GetList()
        {
            return dbContext.Genders.ToList();
        }
        public IEnumerable<Gender> GetAll()
        {
            return dbContext.Genders;
        }

        public void Update(Gender gender)
        {
            dbContext.Entry(gender).State = EntityState.Modified;
        }
        public void Delete(int id)
        {
            Gender gender = dbContext.Genders.Find(id);
            if (gender != null)
                dbContext.Genders.Remove(gender);
        }
        public Gender GetItem(int id)
        {
            return dbContext.Genders.Find(id);
        }
        public int Create(Gender gender)
        {
            dbContext.Genders.Add(gender);
            return gender.Id;
        }

        public void Load()
        {
            dbContext.Genders.Load();
        }
        public void Include(string nameOfTable)
        {
            dbContext.Genders.Include(nameOfTable);
        }
    }
}
