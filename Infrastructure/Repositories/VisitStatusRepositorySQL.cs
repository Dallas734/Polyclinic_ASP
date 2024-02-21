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
    public class VisitStatusRepositorySQL : IRepository<VisitStatus>
    {
        private PolyclinicKurContext dbContext;

        public VisitStatusRepositorySQL(PolyclinicKurContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public List<VisitStatus> GetList()
        {
            return dbContext.VisitStatuses.ToList();
        }
        public IEnumerable<VisitStatus> GetAll()
        {
            return dbContext.VisitStatuses;
        }

        public void Update(VisitStatus visitStatus)
        {
            dbContext.Entry(visitStatus).State = EntityState.Modified;
        }
        public void Delete(int id)
        {
            VisitStatus status = dbContext.VisitStatuses.Find(id);
            if (status != null)
            {
                dbContext.VisitStatuses.Remove(status);
            }
        }
        public VisitStatus GetItem(int id)
        {
            return dbContext.VisitStatuses.Find(id);
        }
        public int Create(VisitStatus status)
        {
            dbContext.VisitStatuses.Add(status);
            return status.Id;
        }
        public void Load()
        {
            dbContext.VisitStatuses.Load();
        }
        public void Include(string nameOfTable)
        {
            dbContext.VisitStatuses.Include(nameOfTable);
        }
    }
}
