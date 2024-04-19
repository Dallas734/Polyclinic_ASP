using Application.Interfaces.Repositories;
using Domain.DomainModels;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class SheduleRepositorySQL : IRepository<Shedule>
    {
        private PolyclinicKurContext dbContext;

        public SheduleRepositorySQL(PolyclinicKurContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public List<Shedule> GetList()
        {
            return dbContext.Shedules.ToList();
        }
        public IEnumerable<Shedule> GetAll()
        {
            return dbContext.Shedules
                .Include(s => s.Day);
        }
        public Shedule GetItem(int id)
        {
            return dbContext.Shedules.Find(id);
        }
        public int Create(Shedule item)
        {
            dbContext.Shedules.Add(item);
            return item.Id;
        }
        public void Update(Shedule item)
        {
            dbContext.Entry(item).State = EntityState.Modified;
        }
        public void Delete(int id)
        {
            Shedule shedule = dbContext.Shedules.Find(id);
            if (shedule != null)
            {
                dbContext.Shedules.Remove(shedule);
            }
        }
        public void Load()
        {
            dbContext.Shedules.Load();
        }
        public void Include(string nameOfTable)
        {
            dbContext.Shedules.Include(nameOfTable);
        }
    }
}
