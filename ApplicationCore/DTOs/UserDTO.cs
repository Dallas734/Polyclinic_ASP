namespace Application.DTOs
{
    public class UserDTO
    {
        public string Username { get; set; }

        public string Email { get; set; }

        public int? DoctorId { get; set; }

        public IEnumerable<string> Roles { get; set; }
    }
}
