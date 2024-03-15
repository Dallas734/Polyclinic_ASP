import DirectoryEntity from "./DirectoryEntity";

interface VisitObj {
  id?: number;
  patientId?: number;
  patientFullName?: string;
  diagnosis?: DirectoryEntity;
  recipe?: string;
  procedure?: DirectoryEntity;
  dateT?: string;
  timeT?: string;
  specialization?: DirectoryEntity;
  doctorId?: number;
  doctorFullName?: string;
  visitStatusId?: number;
  visitStatusName?: string;
}
export default VisitObj;
