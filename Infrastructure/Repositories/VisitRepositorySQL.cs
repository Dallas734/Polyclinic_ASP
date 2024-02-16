﻿using Application.Interfaces.Repositories;
using Domain.DomainModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class VisitRepositorySQL : IRepository<Visit>
    {
        private PolyclinicKurContext dbContext;

        public VisitRepositorySQL(PolyclinicKurContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public List<Visit> GetList()
        {
            return dbContext.Visits.ToList();
        }

        public IEnumerable<Visit> GetAll()
        {
            return dbContext.Visits
                .Include(v => v.Doctor)
                .Include(v => v.Diagnosis)
                .Include(v => v.Procedure);
        }
        public Visit GetItem(int id)
        {
            return dbContext.Visits.Find(id);
        }
        public void Create(Visit item)
        {
            dbContext.Visits.Add(item);
        }
        public void Update(Visit item)
        {
            dbContext.Entry(item).State = EntityState.Modified;
        }
        public void Delete(int id)
        {
            Visit visit = dbContext.Visits.Find(id);
            if (visit != null)
            {
                dbContext.Visits.Remove(visit);
            }
        }
        public void Load()
        {
            dbContext.Visits.Load();
        }
        public void Include(string nameOfTable)
        {
            dbContext.Visits.Include(nameOfTable);
        }
    }
}