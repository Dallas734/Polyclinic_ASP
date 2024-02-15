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
    public class SpecializationRepositorySQL : IRepository<Specialization>
    {
        private PolyclinicKurContext dbContext;

        public SpecializationRepositorySQL(PolyclinicKurContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public List<Specialization> GetList()
        {
            return dbContext.Specializations.ToList();
        }
        public IEnumerable<Specialization> GetAll()
        {
            return dbContext.Specializations;
        }

        public void Update(Specialization specialization) 
        { 
            dbContext.Entry(specialization).State = EntityState.Modified;
        }
        public void Delete(int id)
        {
            Specialization specialization = dbContext.Specializations.Find(id);
            if (specialization != null)
                dbContext.Specializations.Remove(specialization);
        }
        public Specialization GetItem(int id)
        {
            return dbContext.Specializations.Find(id); 
        }
        public void Create(Specialization specialization)
        {
            dbContext.Specializations.Add(specialization);
        }
        public void Load()
        {
            dbContext.Specializations.Load();
        }
        public void Include(string nameOfTable)
        {
            dbContext.Specializations.Include(nameOfTable);
        }
    }
}
