using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel;
using Application.Interfaces.Services;
using Application.Interfaces.Repositories;
using Application.DTOs;
using Domain.DomainModels;

namespace BLL
{
    public class DbDataOperations : IDbCrud
    {
        private IDbRepository dbRepos;

        public DbDataOperations(IDbRepository dbRepositorySQL)
        {
            dbRepos = dbRepositorySQL;
        }

        public List<AddressDTO> addressDTOs 
        { 
            get 
            {
                return dbRepos.Addresses.GetAll().Select(i => new AddressDTO(i)).ToList();
            } 
        }

        public void AddAddress(AddressDTO addressDTO)
        {
            dbRepos.Addresses.Create(new Address()
            {
                Id = addressDTO.Id,
                AreaId = addressDTO.AreaId,
                Name = addressDTO.Name
            });
        }

        public List<AreaDTO> areaDTOs 
        {
            get
            {
                return dbRepos.Areas.GetAll().Select(i => new AreaDTO(i)).ToList();
            }
        }
        public void AddArea(AreaDTO areaDTO)
        {
            dbRepos.Areas.Create(new Area()
            {
                Id = areaDTO.Id,
                Type = areaDTO.Type
            });
        }

        public List<CategoryDTO> categoryDTOs 
        { 
            get
            {
                return dbRepos.Categories.GetAll().Select(i => new CategoryDTO(i)).ToList();
            }
        }

        public List<CertificateDTO> certificateDTOs 
        {
            get
            {
                return dbRepos.Certificates.GetAll().Select(i => new CertificateDTO(i)).ToList();
            }
        }
        public void AddCertificate(CertificateDTO certificateDTO)
        {
            dbRepos.Certificates.Create(new Certificate()
            {
                Id = certificateDTO.Id,
                DoctorId = certificateDTO.DoctorId,
                RegNum = certificateDTO.RegNum,
                Issue = certificateDTO.Issue,
                Expiration = certificateDTO.Expiration
            });
        }

        public List<DayDTO> dayDTOs { 
            get
            {
                return dbRepos.Days.GetAll().Select(i => new DayDTO(i)).ToList();
            }
        }

        public List<DiagnosisDTO> diagnosisDTOs
        { 
            get
            {
                return dbRepos.Diagnosises.GetAll().Select(i => new DiagnosisDTO(i)).ToList();
            }
        }
        public void AddDiagnosis(DiagnosisDTO diagnosisDTO)
        {
            dbRepos.Diagnosises.Create(new Diagnosis()
            {
                Id= diagnosisDTO.Id,
                Name = diagnosisDTO.Name,
            });
        }

        public void DeleteDiagnosis(DiagnosisDTO diagnosisDTO)
        {
            dbRepos.Diagnosises.Delete(diagnosisDTO.Id);
        }

        public List<DoctorDTO> doctorDTOs 
        {
            get
            {
                return dbRepos.Doctors.GetAll().Select(i => new DoctorDTO(i)).ToList();
            }
        }
        public void AddDoctor(DoctorDTO doctorDTO)
        {
            dbRepos.Doctors.Create(new Doctor()
            {
                Id = doctorDTO.Id,
                SpecializationId= doctorDTO.Specialization_id,
                LastName = doctorDTO.LastName,
                FirstName = doctorDTO.FirstName,
                Surname = doctorDTO.Surname,
                DateOfBirth = doctorDTO.DateOfBirth,
                StatusId = doctorDTO.Status_id,
                AreaId = doctorDTO.Area_id,
                CategoryId = doctorDTO.Category_id,
                GenderId = doctorDTO.Gender_id,
            });
        }

        public void DeleteDoctor(int id)
        {
            dbRepos.Doctors.Delete(id);
        }
        public void UpdateDoctor(DoctorDTO doctorDTO)
        {
            Doctor d = dbRepos.Doctors.GetItem(doctorDTO.Id);
            d.SpecializationId = doctorDTO.Specialization_id;
            d.CategoryId = doctorDTO.Category_id;
            d.StatusId = doctorDTO.Status_id;
            d.AreaId = doctorDTO.Area_id;
            d.LastName = doctorDTO.LastName;
            d.FirstName = doctorDTO.FirstName;
            d.Surname = doctorDTO.Surname;
            d.DateOfBirth = doctorDTO.DateOfBirth;
            d.GenderId = doctorDTO.Gender_id;

            dbRepos.Doctors.Update(d);
            //dbRepos.Save();
        }

        public List<PatientDTO> patientDTOs 
        { 
            get
            {
                return dbRepos.Patients.GetAll().Select(i => new PatientDTO(i)).ToList();
            }
        }
        public void AddPatient(PatientDTO patientDTO)
        {
            dbRepos.Patients.Create(new Patient()
            {
                Id = patientDTO.Id,
                LastName = patientDTO.LastName,
                FirstName = patientDTO.FirstName,
                Surname = patientDTO.Surname,
                GenderId = patientDTO.GenderId,
                DateOfBirth = patientDTO.DateOfBirth,
                AddressId = patientDTO.AddressId,
                Polis = patientDTO.Polis,
                WorkPlace = patientDTO.WorkPlace,
            });
        }

        public void UpdatePatient(PatientDTO patientDTO)
        {
            Patient p = dbRepos.Patients.GetItem(patientDTO.Id);
            p.LastName = patientDTO.LastName;
            p.FirstName = patientDTO.FirstName;
            p.Surname = patientDTO.Surname;
            p.GenderId = patientDTO.GenderId;
            p.DateOfBirth = patientDTO.DateOfBirth;
            p.AddressId = patientDTO.AddressId;
            p.Polis = patientDTO.Polis;
            p.WorkPlace = patientDTO.WorkPlace;

            dbRepos.Patients.Update(p);
            //dbRepos.Save();
        }

        public void DeletePatient(PatientDTO patientDTO)
        {
            dbRepos.Patients.Delete(patientDTO.Id);
        }

        public List<ProcedureDTO> procedureDTOs 
        { 
            get
            {
                return dbRepos.Procedures.GetAll().Select(i => new ProcedureDTO(i)).ToList();
            }
        }
        public void AddProcedure(ProcedureDTO procedureDTO)
        {
            dbRepos.Procedures.Create(new Procedure()
            {
                Id = procedureDTO.Id,
                Name = procedureDTO.Name,
            });
        }

        public List<SpecializationDTO> specializationDTOs { 
            get
            {
                return dbRepos.Specializations.GetAll().Select(i => new SpecializationDTO(i)).ToList();
            }
        }
        public void AddSpecialization(SpecializationDTO specializationDTO)
        {
            dbRepos.Specializations.Create(new Specialization()
            {
                Id = specializationDTO.Id,
                Name = specializationDTO.Name,
            });
        }

        public List<StatusDTO> statusDTOs 
        { 
            get
            {
                return dbRepos.Statuses.GetAll().Select(i => new StatusDTO(i)).ToList();
            }
        }
        public void AddStatus(StatusDTO statusDTO)
        {
            dbRepos.Statuses.Create(new Status()
            {
                Id = statusDTO.Id,
                Name = statusDTO.Name,
            });
        }

        public List<VisitDTO> visitDTOs 
        {
            get
            {
                return dbRepos.Visits.GetAll().Select(i => new VisitDTO(i)).ToList();
            }
        }

        public void AddVisit(VisitDTO visit)
        {
            dbRepos.Visits.Create(new Visit()
            {
                DateT = visit.DateT, 
                TimeT = visit.TimeT, 
                DoctorId = visit.DoctorId,
                PatientId = visit.PatientId,
                DiagnosisId = visit.DiagnosisId, 
                ProcedureId = visit.ProcedureId, 
                VisitStatusId = visit.VisitStatusId
            });
        }
        public List<VisitStatusDTO> visitStatusDTOs
        {
            get
            {
                return dbRepos.VisitStatuses.GetAll().Select(i => new VisitStatusDTO(i)).ToList();
            }
        }
        public void AddVisitStatus(VisitStatusDTO visitStatusDTO)
        {
            dbRepos.VisitStatuses.Create(new VisitStatus()
            {
                Id = visitStatusDTO.Id,
                Name = visitStatusDTO.Name,
            });
        }

        public void DeleteVisit(VisitDTO visit)
        {
            dbRepos.Visits.Delete(visit.Id);
        }
        public List<GenderDTO> genderDTOs
        {
            get
            {
                return dbRepos.Genders.GetAll().Select(i => new GenderDTO(i)).ToList();
            }
        }

        public void UpdateVisit(VisitDTO visit)
        {
            Visit v = dbRepos.Visits.GetItem(visit.Id);
            v.ProcedureId = visit.ProcedureId;
            v.DiagnosisId = visit.DiagnosisId;
            v.Recipe = visit.Recipe;
            v.VisitStatusId = visit.VisitStatusId;

            dbRepos.Visits.Update(v);
            //dbRepos.Save();
        }

        public void UpdateShedule(SheduleDTO shedule)
        {
            Shedule s = dbRepos.Shedules.GetItem(shedule.Id);
            s.BeginTime = shedule.newBeginTime;
            s.EndTime = shedule.newEndTime;
            
            dbRepos.Shedules.Update(s);
            //dbRepos.Save();
        }


        public void Save()
        {
            dbRepos.Save();
        }
    }
}
