using Application.DTOs;
using Domain.ReportModels;

namespace Application.Interfaces.Services
{
    public interface IReportService
    {
        List<WorkloadAreaReportDTO> MakeWorkLoadAreaReport(DateOnly begin, DateOnly end);

        List<WorkloadDoctorReportDTO> MakeWorkloadDoctorReport(DateOnly begin, DateOnly end, int specId);

        //List<ReportModel> MakeDiagnosisReport(int doctor_id, DateTime begin, DateTime end);*//*
    }
}
