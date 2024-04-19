using Application.DTOs;

namespace Application.Interfaces.Services
{
    public interface ISheduleService
    {
        List<SheduleDTO> GetSheduleOnDoctor(int doctorId);
    }
}
