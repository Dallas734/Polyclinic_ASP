﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.DTOs;


namespace Application.Interfaces.Services
{
    public interface IDbCrud
    {
        List<AreaDTO> areaDTOs { get; }
        void AddArea(AreaDTO areaDTO);

        List<CategoryDTO> categoryDTOs { get; }

        List<CertificateDTO> certificateDTOs { get; }
        void AddCertificate(CertificateDTO certificateDTO);

        List<DayDTO> dayDTOs { get; }

        List<DiagnosisDTO> diagnosisDTOs { get; }
        void AddDiagnosis(DiagnosisDTO diagnosisDTO);
        void DeleteDiagnosis(DiagnosisDTO diagnosisDTO);

        List<DoctorDTO> doctorDTOs { get; }
        int AddDoctor(DoctorDTO doctorDTO);
        void DeleteDoctor(int id);
        void UpdateDoctor(DoctorDTO doctorDTO);

        List<PatientDTO> patientDTOs { get; }
        int AddPatient(PatientDTO patientDTO);
        void DeletePatient(int id);

        void UpdatePatient(PatientDTO patientDTO);

        List<ProcedureDTO> procedureDTOs { get; }
        void AddProcedure(ProcedureDTO procedureDTO);

        List<SpecializationDTO> specializationDTOs { get; }
        void AddSpecialization(SpecializationDTO specializationDTO);

        List<StatusDTO> statusDTOs { get; }
        void AddStatus(StatusDTO statusDTO);

        List<VisitDTO> visitDTOs { get; }
        int AddVisit(VisitDTO visitDTO);
        void DeleteVisit(int id);

        void UpdateVisit(VisitDTO visitDTO);

        List<VisitStatusDTO> visitStatusDTOs { get; }
        void AddVisitStatus(VisitStatusDTO visitStatusDTO);

        List<GenderDTO> genderDTOs { get; }

        void UpdateShedule(SheduleDTO shedule);

        Task Save();
    }
}
