import React, { useState, useEffect } from "react";
import DoctorObj from "../Entities/DoctorObj";
import ModalDoctor from "./ModalDoctor";
import {Button, Table, Input} from "antd";
import type { TableProps } from "antd";
import { SearchOutlined } from "@ant-design/icons"; 
import { ColumnFilterItem } from "antd/es/table/interface";
import DirectoryEntity from "../Entities/DirectoryEntity";

interface PropsType {

}

const Doctor: React.FC<PropsType> = () => {

    const [doctors, setDoctors] = useState<Array<DoctorObj>>([]);
    const [areas, setAreas] = useState<Array<DirectoryEntity>>([]);
    const [statuses, setStatuses] = useState<Array<DirectoryEntity>>([]);
    const [genders, setGenders] = useState<Array<DirectoryEntity>>([]);
    const [specializations, setSpec] = useState<Array<DirectoryEntity>>([]);
    const [categories,  setCategories] = useState<Array<DirectoryEntity>>([]);
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

        fetch('api/area', {method: 'GET'})
        .then(response => response.json())
        .then((data: Array<DirectoryEntity>) => {
            setAreas(data);
        });

        fetch('api/status', {method: 'GET'})
        .then(response => response.json())
        .then((data: Array<DirectoryEntity>) => setStatuses(data));

        fetch('api/gender', {method: 'GET'})
       .then(response => response.json())
       .then((data: Array<DirectoryEntity>) => setGenders(data));

       fetch('api/category', {method: 'GET'})
       .then(response => response.json())
       .then((data: Array<DirectoryEntity>) => setCategories(data));

       fetch('api/specialization', {method: 'GET'})
       .then(response => response.json())
       .then((data: Array<DirectoryEntity>) => setSpec(data));

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

    const createFilterArray = (elements: Array<DirectoryEntity>): Array<ColumnFilterItem> =>
    {
        return elements.map<ColumnFilterItem>(a => ({text: a.name, value: a.id}));
    }
    
    const columns: TableProps<DoctorObj>['columns'] = [
        { title: 'Фамилия', dataIndex: 'lastName', key: 'lastName', 
            filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
            <React.Fragment>
                <Input autoFocus placeholder="Введите Фамилию"
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value?[e.target.value]:[])}
                    onPressEnter={() => confirm()}
                    onBlur={() => confirm()}
                    >               
                </Input>
                <Button onClick={() => confirm()} type="primary" key="searchButton">Поиск</Button>
                <Button onClick={() => {
                    clearFilters? clearFilters() : setSelectedKeys([]);
                    confirm();
                }} type="primary" danger key="dropFilter">Сброс фильтра</Button>
            </React.Fragment>
            ),
            filterIcon: () => <SearchOutlined />,
            onFilter: (value, record) => record.lastName.toLowerCase().includes(value.toString().toLowerCase())},
        { title: 'Имя', dataIndex: 'firstName', key: 'firstName',
            filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
                <React.Fragment>
                    <Input autoFocus placeholder="Введите Имя"
                        value={selectedKeys[0]}
                        onChange={e => {setSelectedKeys(e.target.value?[e.target.value]:[])}}
                        onPressEnter={() => confirm()}
                        onBlur={() => confirm()}
                        key="nameInput">               
                    </Input>
                    <Button onClick={() => confirm()} type="primary">Поиск</Button>
                    <Button onClick={() => {
                        clearFilters? clearFilters() : setSelectedKeys([]);
                        confirm();
                    }} type="primary" danger>Сброс фильтра</Button>
                </React.Fragment>
                ),
                filterIcon: () => <SearchOutlined />,
                onFilter: (value, record) => record.firstName.toLowerCase().includes(value.toString().toLowerCase()) },
        { title: 'Отчество', dataIndex: 'surname', key: 'surname', 
            filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
                <React.Fragment>
                    <Input autoFocus placeholder="Введите Отчество"
                        value={selectedKeys[0]}
                        onChange={e => setSelectedKeys(e.target.value?[e.target.value]:[])}
                        onPressEnter={() => confirm()}
                        onBlur={() => confirm()}>               
                    </Input>
                    <Button onClick={() => confirm()} type="primary">Поиск</Button>
                    <Button onClick={() => {
                        clearFilters? clearFilters() : setSelectedKeys([]);
                        confirm();
                    }} type="primary" danger>Сброс фильтра</Button>
                </React.Fragment>
                ),
                filterIcon: () => <SearchOutlined />,
                onFilter: (value, record) => record.surname.toLowerCase().includes(value.toString().toLowerCase())},
        { title: 'Пол', dataIndex: 'genderName', key: 'genderName',
            filters: createFilterArray(genders), onFilter: (value, record) => record.genderId === value},
        { title: 'Дата рождения', dataIndex: 'dateOfBirth', key: 'dateOfBirth'},
        { title: 'Специализация', dataIndex: 'specializationName', key: 'specializationName',
            filters: createFilterArray(specializations), onFilter: (value, record) => record.specializationId === value },
        { title: 'Категория', dataIndex: 'categoryName', key: 'categoryName',
            filters: createFilterArray(categories), onFilter: (value, record) => record.categoryId === value },
        { title: 'Участок', dataIndex: 'areaId', key: 'areaId',
            filters: areas.map<ColumnFilterItem>(a => ({text: a.id, value: a.id})), onFilter: (value, record) => record.areaId === value},
        { title: 'Статус', dataIndex: 'statusName', key: 'statusName',
            filters: createFilterArray(statuses), onFilter: (value, record) => record.statusId === value},
        { key: 'x', render: (row: DoctorObj) =>  <Button key="deleteBtn" type="primary" onClick={() => deleteDoctor(row.id)} danger>Удалить</Button> },
        { key: 'e', render: (row: DoctorObj) => <Button key="editBtn" type="primary" style={{background: "green", borderColor: "green"}} onClick={() => handleEditBtn(row)}>Изменить</Button>}
    ]
    return (
        <React.Fragment>
            <ModalDoctor editingDoctor={editingDoctor} updateDoctor={updateDoctor} addDoctor={addDoctor} method="POST" modalIsShow={modalIsShow} showModal={showModal}/>
            <div>
            <h3>Список врачей</h3>
            <Button key="addBtn" type="primary" onClick={() => handleAddBtn(true)}>Добавить</Button>
            </div>
            <Table key="doctorTable" dataSource={doctors} columns={columns} pagination={{ pageSize: 10 }} scroll={{ y: 450}} bordered />
        </React.Fragment>
    );
}
export default Doctor;