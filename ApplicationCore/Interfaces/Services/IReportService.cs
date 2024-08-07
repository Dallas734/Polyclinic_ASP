using Application.DTOs;
using Domain.ReportModels;

namespace Application.Interfaces.Services
{
    public interface IReportService
    {
        List<WorkloadAreaReportDTO> MakeWorkLoadAreaReport(DateOnly begin, DateOnly end);

        //List<ReportModel> MakeDiagnosisReport(int doctor_id, DateTime begin, DateTime end);*//*
    }
}
