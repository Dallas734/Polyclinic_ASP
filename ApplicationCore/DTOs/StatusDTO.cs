using Domain.DomainModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs
{
    public class StatusDTO
    {
        public StatusDTO()
        {

        }

        public StatusDTO(Status s)
        {
            Id = s.Id;
            Name = s.Name;
        }

        public int Id { get; set; }

        public string Name { get; set; }

    }
}
