import React, {useState, useEffect} from "react";
import {Button, Input, Table} from "antd";
import type { TableProps } from "antd";
import PatientObj from "./PatientObj";
import ModalPatient from "./ModalPatient";
import DirectoryEntity from "../DirectoryEntity/DirectoryEntity";
import { ColumnFilterItem } from "antd/es/table/interface";
import { SearchOutlined } from "@ant-design/icons"; 

interface PropsType {

}

const Patient: React.FC<PropsType> = () => {
    const [patients, setPatients] = useState<Array<PatientObj>>([]);
    const [modalIsShow, setShowModal] = useState<boolean>(false);
    const [editingPatient, setEditingPatient] = useState<PatientObj>();

    const [areas, setAreas] = useState<Array<DirectoryEntity>>([]);
    const [genders, setGenders] = useState<Array<DirectoryEntity>>([]);

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
        fetch('api/area', {method: 'GET'})
        .then(response => response.json())
        .then((data: Array<DirectoryEntity>) => {
            setAreas(data);
        });

        fetch('api/gender', {method: 'GET'})
       .then(response => response.json())
       .then((data: Array<DirectoryEntity>) => setGenders(data));

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

    const createFilterArray = (elements: Array<DirectoryEntity>): Array<ColumnFilterItem> =>
    {
        return elements.map<ColumnFilterItem>(a => ({text: a.name, value: a.id}));
    }
    
    const columns: TableProps<PatientObj>['columns'] = [
        { title: 'Фамилия', dataIndex: 'lastName', key: 'lastName',
            filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
                <>
                <Input autoFocus placeholder="Введите Фамилию"
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value?[e.target.value]:[])}
                    onPressEnter={() => confirm()}
                    onBlur={() => confirm()}
                    >               
                </Input>
                <Button onClick={() => confirm()} type="primary">Поиск</Button>
                <Button onClick={() => {
                    clearFilters? clearFilters() : setSelectedKeys([]);
                    confirm();
                }} type="primary" danger>Сброс фильтра</Button>
                </>
                ),
                filterIcon: () => <SearchOutlined />,
                onFilter: (value, record) => record.lastName.toLowerCase().includes(value.toString().toLowerCase()) },
        { title: 'Имя', dataIndex: 'firstName', key: 'firstName',
            filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
                <>
                <Input autoFocus placeholder="Введите Имя"
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value?[e.target.value]:[])}
                    onPressEnter={() => confirm()}
                    onBlur={() => confirm()}
                    >               
                </Input>
                <Button onClick={() => confirm()} type="primary">Поиск</Button>
                <Button onClick={() => {
                    clearFilters? clearFilters() : setSelectedKeys([]);
                    confirm();
                }} type="primary" danger>Сброс фильтра</Button>
                </>
                ),
                filterIcon: () => <SearchOutlined />,
                onFilter: (value, record) => record.firstName.toLowerCase().includes(value.toString().toLowerCase())},
        { title: 'Отчество', dataIndex: 'surname', key: 'surname',
            filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
                <>
                <Input autoFocus placeholder="Введите Отчество"
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value?[e.target.value]:[])}
                    onPressEnter={() => confirm()}
                    onBlur={() => confirm()}
                    >               
                </Input>
                <Button onClick={() => confirm()} type="primary">Поиск</Button>
                <Button onClick={() => {
                    clearFilters? clearFilters() : setSelectedKeys([]);
                    confirm();
                }} type="primary" danger>Сброс фильтра</Button>
                </>
                ),
                filterIcon: () => <SearchOutlined />,
                onFilter: (value, record) => record.surname.toLowerCase().includes(value.toString().toLowerCase())},
        { title: 'Пол', dataIndex: 'genderName', key: 'genderName', 
            filters: createFilterArray(genders), onFilter: (value, record) => record.genderId === value},
        { title: 'Дата рождения', dataIndex: 'dateOfBirth', key: 'dateOfBirth' },
        { title: 'Полис', dataIndex: 'polis', key: 'polis', width: '12%',
            filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
                <>
                <Input autoFocus placeholder="Введите Полис"
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value?[e.target.value]:[])}
                    onPressEnter={() => confirm()}
                    onBlur={() => confirm()}
                    >               
                </Input>
                <Button onClick={() => confirm()} type="primary">Поиск</Button>
                <Button onClick={() => {
                    clearFilters? clearFilters() : setSelectedKeys([]);
                    confirm();
                }} type="primary" danger>Сброс фильтра</Button>
                </>
                ),
                filterIcon: () => <SearchOutlined />,
                onFilter: (value, record) => record.polis.toLowerCase().includes(value.toString().toLowerCase()) },
        { title: 'Участок', dataIndex: 'areaId', key: 'areaId',
            filters: areas.map<ColumnFilterItem>(a => ({text: a.id, value: a.id})), onFilter: (value, record) => record.areaId === value},
        { title: 'Адрес', dataIndex: 'addressName', key: 'addressName',
            filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
                <>
                <Input autoFocus placeholder="Введите Адрес"
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value?[e.target.value]:[])}
                    onPressEnter={() => confirm()}
                    onBlur={() => confirm()}
                    >               
                </Input>
                <Button onClick={() => confirm()} type="primary">Поиск</Button>
                <Button onClick={() => {
                    clearFilters? clearFilters() : setSelectedKeys([]);
                    confirm();
                }} type="primary" danger>Сброс фильтра</Button>
                </>
                ),
                filterIcon: () => <SearchOutlined />,
                onFilter: (value, record) => record.address? record.address.toLowerCase().includes(value.toString().toLowerCase()) : false},
        { title: 'Место работы', dataIndex: 'workPlace', key: 'workPlace', 
            filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
                <>
                <Input autoFocus placeholder="Введите Место работы"
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value?[e.target.value]:[])}
                    onPressEnter={() => confirm()}
                    onBlur={() => confirm()}
                    >               
                </Input>
                <Button onClick={() => confirm()} type="primary">Поиск</Button>
                <Button onClick={() => {
                    clearFilters? clearFilters() : setSelectedKeys([]);
                    confirm();
                }} type="primary" danger>Сброс фильтра</Button>
                </>
                ),
                filterIcon: () => <SearchOutlined />,
                onFilter: (value, record) => record.workPlace.toLowerCase().includes(value.toString().toLowerCase())},
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
            <Table key="doctorTable" dataSource={patients} columns={columns} pagination={{ pageSize: 10 }} scroll={{ y: 450}} bordered />
        </React.Fragment>
    );
}
export default Patient;