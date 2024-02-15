using Domain.DomainModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs
{
    public class CertificateDTO
    {
        public CertificateDTO() { }

        public CertificateDTO(Certificate c)
        {
            Id = c.Id;
            DoctorId = c.DoctorId;
            RegNum = c.RegNum;
            Issue = c.Issue;
            Expiration = c.Expiration;
        }
        public int Id { get; set; }

        public int DoctorId { get; set; }

        public string RegNum { get; set; }

        public DateOnly Issue { get; set; }

        public DateOnly Expiration { get; set; }

    }
}
