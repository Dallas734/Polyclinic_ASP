interface PatientObj {
  id?: number;
  lastName: string;
  firstName: string;
  fullName?: string;
  surname: string;
  dateOfBirth: string;
  address?: string;
  areaId?: number;
  polis: string;
  workPlace: string;
  genderId: number;
  genderName?: string;
}

export default PatientObj;
