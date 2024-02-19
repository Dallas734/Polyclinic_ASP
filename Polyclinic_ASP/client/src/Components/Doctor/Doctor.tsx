import { error } from "console";
import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import './Table.css';

interface PropsType {

}

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

const Doctor: React.FC<PropsType> = () => {

    const [doctors, setDoctors] = useState<Array<DoctorObj>>([]);

    const [lastName, setLastName] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [surname, setSurname] = useState<string>("");
    const [dateOfBirth, setDateOfBirth] = useState<string>(new Date().toISOString().split('T')[0]);
    const [specializationId, setSpecializationId] = useState<number>(1);
    const [areaId, setAreaId] = useState<number>(1);
    const [statusId, setStatusId] = useState<number>(1);
    const [categoryId, setCategoryId] = useState<number>(1);
    const [genderId, setGenderId] = useState<number>(1);

    const removeDoctor = (removeId: number | undefined) => setDoctors(doctors.filter(({ id }) => id !== removeId));
    const updateDoctor = (doctor: DoctorObj) => setDoctors(doctors.map(o => {
        if (o.id === doctor.id)
            return doctor
        return o;
    }))
    const addDoctor = (doctor: DoctorObj) => setDoctors([...doctors, doctor]);

    useEffect(() => {
        const getDoctors = async() =>
        {
            const requestOptions: RequestInit = {
                method: 'GET',
                headers: undefined,
                body: undefined
            };

            return await fetch('api/Doctor', requestOptions)
                .then(response => response.json())
                .then(data => {
                    setDoctors(data);
                }, error => console.log(error));
        }
        getDoctors();
    }, [])

    const deleteDoctor = async (id: number | undefined) => {

        const requestOptions : RequestInit = {
            method: 'DELETE',
            headers: undefined,
            body: undefined
        }

        return await fetch(`api/Doctor/${id}`, requestOptions)
            .then(response => {
                if (response.ok) 
                {
                    removeDoctor(id);
                }
            }, error => console.log(error));
    }

    const editDoctor = async (id: number | undefined) => {
        const editDoctor = {
            firstName,
            lastName,
            surname,
            dateOfBirth,
            specializationId,
            areaId,
            statusId,
            categoryId,
            genderId
        }

        const requestOptions : RequestInit = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(editDoctor)
        }

        return await fetch(`api/Doctor/${id}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                updateDoctor(data);
                setFirstName("");
                setLastName("");
                setSurname("");
            },
            error => console.log(error));
    }

    const createDoctor = async () => {
        const doctor: DoctorObj = {
            firstName,
            lastName,
            surname,
            dateOfBirth,
            specializationId,
            areaId,
            statusId,
            categoryId,
            genderId
        };
        
        const requestOptions: RequestInit = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(doctor)
        }

        return await fetch(`api/Doctor`, requestOptions)
            .then(response => response.json())
            .then(data => {
                addDoctor(data);
                setFirstName("");
                setLastName("");
                setSurname("");
            }, error => console.log(error));
    }

    return (
        <React.Fragment>
            <h3>Список врачей</h3>
            <Table bordered hover>
                <thead>
                    <tr>
                        <th>Фамилия</th>
                        <th>Имя</th>
                        <th>Отчество</th>
                        <th>Пол</th>
                        <th>Дата рождения</th>
                        <th>Специализация</th>
                        <th>Категория</th>
                        <th>Участок</th>
                        <th>Статус</th>
                    </tr>
                </thead>
                <tbody>
                    {doctors.map((row, id) => (
                        <tr key={id}>
                            <td>{row.lastName}</td>
                            <td>{row.firstName}</td>
                            <td>{row.surname}</td>
                            <td>{row.genderName}</td>
                            <td>{new Date(row.dateOfBirth).toLocaleDateString()}</td>
                            <td>{row.specializationName}</td>
                            <td>{row.categoryName}</td>
                            <td>{row.areaId == null ? null : row.areaId}</td>
                            <td>{row.statusName}</td>
                            <td><button onClick={() => deleteDoctor(row.id)}>Удалить</button></td>
                            <td><button onClick={() => editDoctor(row.id)}>Изменить</button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </React.Fragment>
    );
}
export default Doctor;