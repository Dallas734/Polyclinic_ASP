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
    public class StatusRepositorySQL : IRepository<Status>
    {
        private PolyclinicKurContext dbContext;

        public StatusRepositorySQL(PolyclinicKurContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public List<Status> GetList()
        {
            return dbContext.Statuses.ToList();
        }
        public IEnumerable<Status> GetAll()
        {
            return dbContext.Statuses;
        }

        public void Update(Status status)
        {
            dbContext.Entry(status).State = EntityState.Modified;
        }
        public void Delete(int id)
        {
            Status status = dbContext.Statuses.Find(id);
            if (status != null)
            {
                dbContext.Statuses.Remove(status);
            }
        }
        public Status GetItem(int id)
        { 
            return dbContext.Statuses.Find(id);
        }
        public int Create(Status status) 
        {
            dbContext.Statuses.Add(status);
            return status.Id;
        }
        public void Load()
        {
            dbContext.Statuses.Load();
        }
        public void Include(string nameOfTable)
        {
            dbContext.Statuses.Include(nameOfTable);
        }
    }
}
