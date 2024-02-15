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
    public class ProcedureRepositorySQL : IRepository<Procedure>
    {
        private PolyclinicKurContext dbContext;

        public ProcedureRepositorySQL(PolyclinicKurContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public List<Procedure> GetList()
        {
            return dbContext.Procedures.ToList();
        }
        public IEnumerable<Procedure> GetAll()
        {
            return dbContext.Procedures;
        }

        public void Update(Procedure procedure)
        { 
            dbContext.Entry(procedure).State = EntityState.Modified;
        }
        public void Delete(int id)
        {
            Procedure procedure = dbContext.Procedures.Find(id);
            if (procedure != null)
                dbContext.Procedures.Remove(procedure);
        }
        public Procedure GetItem(int id) 
        { 
            return dbContext.Procedures.Find(id); 
        }
        public void Create(Procedure procedure)
        {
            dbContext.Procedures.Add(procedure);
        }
        public void Load()
        {
            dbContext.Procedures.Load();
        }
        public void Include(string nameOfTable)
        {
            dbContext.Procedures.Include(nameOfTable);
        }
    }
}
