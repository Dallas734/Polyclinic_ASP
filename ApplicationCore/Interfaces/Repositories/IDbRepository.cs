using Domain.DomainModels;

namespace Application.Interfaces.Repositories
{
    public interface IDbRepository
    {
        IRepository<Doctor> Doctors { get; }
        IRepository<Visit> Visits { get; }
        IRepository<Shedule> Shedules { get; }
        IRepository<Day> Days { get; }
        IRepository<Patient> Patients { get; }
        IRepository<Area> Areas { get; }
        IRepository<Diagnosis> Diagnosises { get; }
        IRepository<Procedure> Procedures { get; }
        IRepository<Specialization> Specializations { get; }
        IRepository<Status> Statuses { get; }
        IRepository<Category> Categories { get; }
        IRepository<Certificate> Certificates { get; }

        IRepository<VisitStatus> VisitStatuses { get; }

        IRepository<Gender> Genders { get; }

        IReportRepository Reports { get; }
        Task Save();
    }
}
