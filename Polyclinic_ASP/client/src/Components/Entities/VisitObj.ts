interface VisitObj {
    id?: number,
    patientId?: number,
    patientFullName?: string,
    diagnosisId?: number,
    recipe?: string,
    procedureId?: number,
    dateT?: string,
    timeT?: string,
    doctorId?: number,
    doctorFullName?: string,
    visitStatusId?: number,
    visitStatusName?: string
}
export default VisitObj;