using Application.Interfaces.Repositories;
using Domain.DomainModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class AreaRepositorySQL : IRepository<Area>
    {
        private PolyclinicKurContext dbContext;

        public AreaRepositorySQL(PolyclinicKurContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public List<Area> GetList()
        {
            return dbContext.Areas.ToList();
        }
        public IEnumerable<Area> GetAll()
        {
            return dbContext.Areas;
        }

        public void Update(Area area) 
        { 
            dbContext.Entry(area).State = EntityState.Modified;
        }
        public void Delete(int id)
        {
            Area area = dbContext.Areas.Find(id);
            if (area != null)
            {
                dbContext.Areas.Remove(area);
            }
        }
        public Area GetItem(int id) 
        {
            return dbContext.Areas.Find(id); 
        }
        public int Create(Area area) 
        { 
            dbContext.Areas.Add(area);
            return area.Id;
        }
        public void Load()
        {
            dbContext.Areas.Load();
        }
        public void Include(string nameOfTable)
        {
            dbContext.Areas.Include(nameOfTable);
        }
    }
}
