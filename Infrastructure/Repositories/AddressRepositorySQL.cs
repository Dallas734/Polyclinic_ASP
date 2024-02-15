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
    public class AddressRepositorySQL : IRepository<Address>
    {
        private PolyclinicKurContext dbContext;

        public AddressRepositorySQL(PolyclinicKurContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public List<Address> GetList()
        {
            return dbContext.Addresses.ToList();
        }
        public IEnumerable<Address> GetAll()
        {
            return dbContext.Addresses;
        }

        public void Update(Address address) 
        {
            dbContext.Entry(address).State = EntityState.Modified;
        }
        public void Delete(int id)
        {
            Address address = dbContext.Addresses.Find(id);
            if (address != null)
            {
                dbContext.Addresses.Remove(address);
            }
        }
        public Address GetItem(int id) 
        {
            return dbContext.Addresses.Find(id);
        }
        public void Create(Address address) 
        {
            dbContext.Addresses.Add(address);
        }
        public void Load()
        {
            dbContext.Addresses.Load();
        }
        public void Include(string nameOfTable)
        {
            dbContext.Addresses.Include(nameOfTable);
        }
    }
}
