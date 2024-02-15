using Application.Interfaces.Repositories;
using Domain.DomainModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;

namespace Infrastructure.Repositories
{
    public class DbRepositorySQL : IDbRepository
    {
        private PolyclinicKurContext dbContext;

        private DoctorRepositorySQL doctorRepository;
        private VisitRepositorySQL visitRepository;
        private SheduleRepositorySQL sheduleRepository;
        private PatientRepositorySQL patientRepository;
        private DayRepositorySQL dayRepository;
        private AreaRepositorySQL areaRepository;
        private AddressRepositorySQL addressRepository;
        private ProcedureRepositorySQL procedureRepository;
        private DiagnosisRepositorySQL diagnosisRepository;
        private SpecializationRepositorySQL specializationRepository;
        private StatusRepositorySQL statusRepository;
        private CategoryRepositorySQL categoryRepository;
        private CertificateRepositorySQL certificateRepository;
        private VisitStatusRepositorySQL visitStatusRepository;
        private GenderRepositorySQL genderRepository;  
        private ReportRepositorySQL reportRepository;
        public DbRepositorySQL(PolyclinicKurContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public IRepository<Doctor> Doctors
        {
            get
            {
                if (doctorRepository == null)
                    doctorRepository = new DoctorRepositorySQL(dbContext);
                return doctorRepository;
            }
        }
        public IRepository<Visit> Visits
        {
            get
            {
                if (visitRepository == null)
                    visitRepository = new VisitRepositorySQL(dbContext);
                return visitRepository;
            }
        }
        public IRepository<Shedule> Shedules
        {
            get
            {
                if (sheduleRepository == null)
                    sheduleRepository = new SheduleRepositorySQL(dbContext);
                return sheduleRepository;
            }
        }
        public IRepository<Patient> Patients
        {
            get
            {
                if (patientRepository == null)
                    patientRepository = new PatientRepositorySQL(dbContext);
                return patientRepository;
            }
        }

        public IRepository<Day> Days
        {
            get
            {
                if (dayRepository == null)
                    dayRepository = new DayRepositorySQL(dbContext);
                return dayRepository;
            }
        }

        public IRepository<Area> Areas
        {
            get
            {
                if (areaRepository == null)
                    areaRepository = new AreaRepositorySQL(dbContext);
                return areaRepository;
            }
        }

        public IRepository<Address> Addresses
        {
            get
            {
                if (addressRepository == null)
                    addressRepository = new AddressRepositorySQL(dbContext);
                return addressRepository;
            }
        }

        public IRepository<Procedure> Procedures
        {
            get
            {
                if (procedureRepository == null)
                    procedureRepository = new ProcedureRepositorySQL(dbContext);
                return procedureRepository;
            }
        }

        public IRepository<Diagnosis> Diagnosises
        {
            get
            {
                if (diagnosisRepository == null)
                    diagnosisRepository = new DiagnosisRepositorySQL(dbContext);
                return diagnosisRepository;
            }
        }

        public IRepository<Specialization> Specializations
        {
            get
            {
                if (specializationRepository == null)
                    specializationRepository = new SpecializationRepositorySQL(dbContext);
                return specializationRepository;
            }
        }

        public IRepository<Status> Statuses
        {
            get
            {
                if (statusRepository == null)
                    statusRepository = new StatusRepositorySQL(dbContext);
                return statusRepository;
            }
        }

        public IRepository<Category> Categories
        {
            get
            {
                if (categoryRepository == null)
                    categoryRepository = new CategoryRepositorySQL(dbContext);
                return categoryRepository;
            }
        }

        public IRepository<Certificate> Certificates
        {
            get
            {
                if (certificateRepository == null)
                    certificateRepository = new CertificateRepositorySQL(dbContext);
                return certificateRepository;
            }
        }

        public IRepository<VisitStatus> VisitStatuses
        {
            get
            {
                if (visitStatusRepository == null)
                    visitStatusRepository = new VisitStatusRepositorySQL(dbContext);
                return visitStatusRepository;
            }
        }

        public IRepository<Gender> Genders
        {
            get
            {
                if (genderRepository == null)
                    genderRepository = new GenderRepositorySQL(dbContext); 
                return genderRepository;
            }
        }
        public IReportRepository Reports
        {
            get
            {
                if (reportRepository == null)
                    reportRepository = new ReportRepositorySQL(dbContext);
                return reportRepository;
            }
        }
        public int Save()
        {
            return dbContext.SaveChanges();
        }
    }
}
