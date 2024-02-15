using Domain.DomainModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs
{
    public class ProcedureDTO
    {
        public ProcedureDTO()
        {

        }

        public ProcedureDTO(Procedure p)
        {
            Id = p.Id;
            Name = p.Name;
        }

        public int Id { get; set; }

        public string Name { get; set; }

    }
}
