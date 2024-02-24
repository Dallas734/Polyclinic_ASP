interface DoctorObj {
    id?: number
    firstName: string,
    lastName: string,
    surname: string,
    dateOfBirth: string,
    specializationId: number,
    specializationName?: string,
    statusId: number,
    statusName?: string,
    areaId?: number,
    categoryId: number,
    categoryName?: string,
    genderId: number,
    genderName?: string
}

export default DoctorObj;