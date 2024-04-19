using Microsoft.AspNetCore.Identity;

namespace Domain.DomainModels
{
    public class User : IdentityUser
    {
        public int? DoctorId { get; set; }
    }
}
