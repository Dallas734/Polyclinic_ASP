using Domain.DomainModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs
{
    public class VisitStatusDTO
    {
        public VisitStatusDTO() { }

        public VisitStatusDTO(VisitStatus visitStatus)
        {
            Id = visitStatus.Id;
            Name = visitStatus.Name;
        }

        public int Id { get; set; }

        public string Name { get; set; }

    }
}
