import React, {useState, useEffect} from "react";
import {Button, Table} from "antd";
import type { TableProps } from "antd";
import PatientObj from "./PatientObj";
import ModalPatient from "./ModalPatient";

interface PropsType {

}

const Patient: React.FC<PropsType> = () => {
    const [patients, setPatients] = useState<Array<PatientObj>>([]);
    const [modalIsShow, setShowModal] = useState<boolean>(false);
    const [editingPatient, setEditingPatient] = useState<PatientObj>();

    const removePatient = (removeId: number | undefined) => setPatients(patients.filter(({ id }) => id !== removeId));
    const updatePatient = (doctor: PatientObj) => setPatients(patients.map(o => {
        if (o.id === doctor.id)
            return doctor
        return o;
    }))
    const addDoctor = (doctor: PatientObj) => setPatients([...patients, doctor]);

    useEffect(() => {
        const getPatients = async() =>
        {
            const requestOptions: RequestInit = {
                method: 'GET',
                headers: undefined,
                body: undefined
            };

            return await fetch('api/Patient', requestOptions)
                .then(response => response.json())
                .then(data => {
                    setPatients(data);
                }, error => console.log(error));
        }
        getPatients();
    }, [])

    const deletePatient = async (id: number | undefined) => {

        const requestOptions : RequestInit = {
            method: 'DELETE',
            headers: undefined,
            body: undefined
        }

        return await fetch(`api/Patient/${id}`, requestOptions)
            .then(response => {
                if (response.ok) 
                {
                    removePatient(id);
                }
            }, error => console.log(error));
    }

    const showModal = (value: boolean) => {
        setShowModal(value);
    }

    const handleAddBtn = (value: boolean) => {
        setEditingPatient(undefined);
        setShowModal(true);
    }

    const handleEditBtn = (obj: PatientObj) => {
        setEditingPatient(obj);
        setShowModal(true);
    }

    const columns: TableProps<PatientObj>['columns'] = [
        { title: 'Фамилия', dataIndex: 'lastName', key: 'lastName' },
        { title: 'Имя', dataIndex: 'firstName', key: 'firstName' },
        { title: 'Отчество', dataIndex: 'surname', key: 'surname'},
        { title: 'Пол', dataIndex: 'genderName', key: 'genderName'},
        { title: 'Дата рождения', dataIndex: 'dateOfBirth', key: 'dateOfBirth' },
        { title: 'Полис', dataIndex: 'polis', key: 'polis', width: '12%' },
        { title: 'Участок', dataIndex: 'areaId', key: 'areaId'},
        { title: 'Адрес', dataIndex: 'addressName', key: 'addressName'},
        { title: 'Место работы', dataIndex: 'workPlace', key: 'workPlace' },
        { key: 'x', render: (row: PatientObj) =>  <Button key="deleteBtn" type="primary" onClick={() => deletePatient(row.id)} danger>Удалить</Button> },
        { key: 'e', render: (row: PatientObj) => <Button key="editBtn" type="primary" style={{background: "green", borderColor: "green"}} onClick={() => handleEditBtn(row)}>Изменить</Button>}
    ]
    return (
        <React.Fragment>
            {<ModalPatient editingPatient={editingPatient} updatePatient={updatePatient} addPatient={addDoctor} method="POST" modalIsShow={modalIsShow} showModal={showModal}/>}
            <div>
            <h3>Список пациентов</h3>
            <Button key="addBtn" type="primary" onClick={() => handleAddBtn(true)}>Добавить</Button>
            </div>
            <Table key="doctorTable" dataSource={patients} columns={columns} pagination={{ pageSize: 50 }} scroll={{ y: 450}} bordered />
        </React.Fragment>
    );
}
export default Patient;