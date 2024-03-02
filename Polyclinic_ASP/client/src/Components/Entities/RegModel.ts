interface RegModel {
    email: string,
    password: string,
    passwordConfirm: string,
    doctorId?: number,
    role: string
}

export default RegModel;