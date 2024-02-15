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
    public class DiagnosisRepositorySQL : IRepository<Diagnosis>
    {
        private PolyclinicKurContext dbContext;

        public DiagnosisRepositorySQL(PolyclinicKurContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public List<Diagnosis> GetList()
        {
            return dbContext.Diagnoses.ToList();
        }
        public IEnumerable<Diagnosis> GetAll()
        {
            return dbContext.Diagnoses;
        }

        public void Update(Diagnosis diagnosis) 
        {
            dbContext.Entry(diagnosis).State = EntityState.Modified;
        }
        public void Delete(int id)
        {
            Diagnosis diagnosis = dbContext.Diagnoses.Find(id);
            if (diagnosis != null)
                dbContext.Diagnoses.Remove(diagnosis);
        }
        public Diagnosis GetItem(int id) 
        { 
            return dbContext.Diagnoses.Find(id);
        }
        public void Create(Diagnosis diagnosis)
        {
            dbContext.Diagnoses.Add(diagnosis);
        }
        public void Load()
        {
            dbContext.Diagnoses.Load();
        }
        public void Include(string nameOfTable)
        {
            dbContext.Diagnoses.Include(nameOfTable);
        }
    }
}
