import React, { useState, useEffect } from "react";
import DoctorObj from "./DoctorObj";
import ModalDoctor from "./ModalDoctor";
import {Button, Table} from "antd";
import type { TableProps } from "antd";

interface PropsType {

}

const Doctor: React.FC<PropsType> = () => {

    const [doctors, setDoctors] = useState<Array<DoctorObj>>([]);
    const [modalIsShow, setShowModal] = useState<boolean>(false);
    const [editingDoctor, setEditingDoctor] = useState<DoctorObj>();

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

    const showModal = (value: boolean) => {
        setShowModal(value);
    }

    const handleAddBtn = (value: boolean) => {
        setEditingDoctor(undefined);
        setShowModal(true);
    }

    const handleEditBtn = (obj: DoctorObj) => {
        setEditingDoctor(obj);
        setShowModal(true);
    }

    const columns: TableProps<DoctorObj>['columns'] = [
        { title: 'Фамилия', dataIndex: 'lastName', key: 'lastName' },
        { title: 'Имя', dataIndex: 'firstName', key: 'firstName' },
        { title: 'Отчество', dataIndex: 'surname', key: 'surname'},
        { title: 'Пол', dataIndex: 'genderName', key: 'genderName'},
        { title: 'Дата рождения', dataIndex: 'dateOfBirth', key: 'dateOfBirth' },
        { title: 'Специализация', dataIndex: 'specializationName', key: 'specializationName' },
        { title: 'Категория', dataIndex: 'categoryName', key: 'categoryName' },
        { title: 'Участок', dataIndex: 'areaId', key: 'areaId'},
        { title: 'Статус', dataIndex: 'statusName', key: 'statusName'},
        { key: 'x', render: (row: DoctorObj) =>  <Button key="deleteBtn" type="primary" onClick={() => deleteDoctor(row.id)} danger>Удалить</Button> },
        { key: 'e', render: (row: DoctorObj) => <Button key="editBtn" type="primary" style={{background: "green", borderColor: "green"}} onClick={() => handleEditBtn(row)}>Изменить</Button>}
    ]
    return (
        <React.Fragment>
            {<ModalDoctor editingDoctor={editingDoctor} updateDoctor={updateDoctor} addDoctor={addDoctor} method="POST" modalIsShow={modalIsShow} showModal={showModal}/>}
            <div>
            <h3>Список врачей</h3>
            <Button key="addBtn" type="primary" onClick={() => handleAddBtn(true)}>Добавить</Button>
            </div>
            <Table key="doctorTable" dataSource={doctors} columns={columns} pagination={{ pageSize: 50 }} scroll={{ y: 450}} bordered />
        </React.Fragment>
    );
}
export default Doctor;