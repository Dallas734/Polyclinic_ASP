using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.DomainModels;

namespace Application.DTOs
{
    public class AddressDTO
    {
        public AddressDTO()
        {

        }

        public AddressDTO(Address a)
        {
            Id = a.Id;
            AreaId = (int)a.AreaId;
            Name = a.Name;
        }

        public int Id { get; set; }

        public int AreaId { get; set; }

        public string Name { get; set; }

    }
}
