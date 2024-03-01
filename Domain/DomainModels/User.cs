using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.DomainModels
{
    public class User : IdentityUser
    {
        public int DoctorId {  get; set; }
    }
}
