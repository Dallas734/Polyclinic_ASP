using Application.DTOs;
using Application.Interfaces.Services;
using Application.Interfaces.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Services
{
    public class ReportService : IReportService
    {
        IDbRepository dbContext;

        public ReportService(IDbRepository repos)
        {
            dbContext = repos;
        }

        /*public List<ReportModel> MakeWorkloadReport(int area_id, DateTime begin, DateTime end)
        {
            return dbContext.Reports.MakeWorkLoadReport(area_id, begin, end).Select(i => new ReportModel(i)).ToList();
        }

        public List<ReportModel> MakeDiagnosisReport(int doctor_id, DateTime begin, DateTime end)
        {
            return dbContext.Reports.MakeDiagnosisReport(doctor_id, begin, end).Select(i => new ReportModel(i)).ToList();
        }*/
    }
}
