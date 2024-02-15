using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.DomainModels;

namespace Application.DTOs
{
    public class UserDTO
    {
        public UserDTO(User user)
        {
            Id = user.Id;
            Login = user.Login;
            Password = user.Password;
            RoleId = user.RoleId;
        }
        public int Id { get; set; }

        public string Login { get; set; }

        public string Password { get; set; }

        public int? RoleId { get; set; }
    }
}
