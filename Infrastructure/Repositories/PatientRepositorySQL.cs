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
    public class PatientRepositorySQL : IRepository<Patient>
    {
        private PolyclinicKurContext dbContext;

        public PatientRepositorySQL(PolyclinicKurContext dbContext)
        {
            this.dbContext = dbContext;
        }
        public List<Patient> GetList()
        {
            return dbContext.Patients.ToList();
        }
        public IEnumerable<Patient> GetAll()
        {
            return dbContext.Patients;
        }
        public Patient GetItem(int id)
        {
            return dbContext.Patients.Find(id);
        }
        public int Create(Patient item)
        {
            dbContext.Patients.Add(item);
            dbContext.SaveChanges();
            return item.Id;
        }
        public void Update(Patient item)
        {
            dbContext.Entry(item).State = EntityState.Modified;
        }
        public void Delete(int id)
        {
            Patient patient = dbContext.Patients.Find(id);
            if (patient != null)
            {
                dbContext.Patients.Remove(patient);
            }
        }
        public void Load()
        {
            dbContext.Patients.Load();
        }

        public void Include(string nameOfTable)
        {
            dbContext.Patients.Include(nameOfTable);
        }
    }
}
