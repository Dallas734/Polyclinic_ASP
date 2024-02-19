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
    public class DoctorRepositorySQL : IRepository<Doctor>
    {
        private PolyclinicKurContext dbContext;

        public DoctorRepositorySQL(PolyclinicKurContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public List<Doctor> GetList()
        {
            return dbContext.Doctors.ToList();
        }

        public IEnumerable<Doctor> GetAll()
        {
            return dbContext.Doctors
                .Include(d => d.Specialization)
                .Include(d => d.Status)
                .Include(d => d.Category)
                .Include(d => d.Gender);
        }
        public Doctor GetItem(int id)
        {
            return dbContext.Doctors.Find(id);
        }
        public void Create(Doctor item)
        {
            dbContext.Doctors.Add(item);
        }
        public void Update(Doctor item)
        {
            dbContext.Entry(item).State = EntityState.Modified;
        }
        public void Delete(int id)
        {
            Doctor doctor = dbContext.Doctors.Find(id);
            if (doctor != null)
            {
                dbContext.Doctors.Remove(doctor);
            }
        }
        public void Load()
        {
            dbContext.Doctors.Load();
        }

        public void Include(string nameOfTable)
        {
            dbContext.Doctors.Include(nameOfTable);
        }
    }
}
