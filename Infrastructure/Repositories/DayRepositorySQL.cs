using Application.Interfaces.Repositories;
using Domain.DomainModels;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class DayRepositorySQL : IRepository<Day>
    {
        private PolyclinicKurContext dbContext;

        public DayRepositorySQL(PolyclinicKurContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public List<Day> GetList()
        {
            return dbContext.Days.ToList();
        }
        public IEnumerable<Day> GetAll()
        {
            return dbContext.Days;
        }

        public void Update(Day day)
        {
            dbContext.Entry(day).State = EntityState.Modified;
        }
        public void Delete(int id)
        {
            Day day = dbContext.Days.Find(id);
            if (day != null)
                dbContext.Days.Remove(day);
        }
        public Day GetItem(int id)
        {
            return dbContext.Days.Find(id);
        }
        public int Create(Day day)
        {
            dbContext.Days.Add(day);
            return day.Id;
        }

        public void Load()
        {
            dbContext.Days.Load();
        }
        public void Include(string nameOfTable)
        {
            dbContext.Days.Include(nameOfTable);
        }
    }
}
