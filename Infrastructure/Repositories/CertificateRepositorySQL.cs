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
    public class CertificateRepositorySQL : IRepository<Certificate>
    {
        private PolyclinicKurContext dbContext;

        public CertificateRepositorySQL(PolyclinicKurContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public List<Certificate> GetList()
        {
            return dbContext.Certificates.ToList();
        }
        public IEnumerable<Certificate> GetAll()
        {
            return dbContext.Certificates;
        }

        public void Update(Certificate certificate)
        {
            dbContext.Entry(certificate).State = EntityState.Modified;
        }
        public void Delete(int id)
        {
            Certificate certificate = dbContext.Certificates.Find(id);
            if (certificate != null)
            {
                dbContext.Certificates.Remove(certificate);
            }
        }
        public Certificate GetItem(int id)
        {
            return dbContext.Certificates.Find(id);
        }
        public int Create(Certificate certificate)
        {
            dbContext.Certificates.Add(certificate);
            return certificate.Id;
        }
        public void Load()
        {
            dbContext.Certificates.Load();
        }
        public void Include(string nameOfTable)
        {
            dbContext.Certificates.Include(nameOfTable);
        }
    }
}
