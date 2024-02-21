import React, {useState, useEffect} from "react";
//import Modal from 'react-bootstrap/Modal';
//import Form from 'react-bootstrap/Form';
//import Button from 'react-bootstrap/Button';
import DoctorObj from "./DoctorObj";
import {Input, Select, Modal, Button, Form} from "antd";

interface PropsType {
    addDoctor: (doctor: DoctorObj) => void,
    updateDoctor: (doctor: DoctorObj) => void,
    method: string,
    modalIsShow: boolean,
    showModal: (value: boolean) => void
}

interface DirectoryEntity{
    id: number, 
    name: string
}

const ModalDoctor: React.FC<PropsType> = ({addDoctor, updateDoctor, method, modalIsShow, showModal}) => {

    const [specializations, setSpec] = useState<Array<DirectoryEntity>>([]);
    const [genders, setGenders] = useState<Array<DirectoryEntity>>([]);
    const [categories, setCategories] = useState<Array<DirectoryEntity>>([]);
    const [areas, setAreas] = useState<Array<DirectoryEntity>>([]);
    const [statuses, setStatuses] = useState<Array<DirectoryEntity>>([]);

    const [lastName, setLastName] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [surname, setSurname] = useState<string>("");
    const [dateOfBirth, setDateOfBirth] = useState<string>(new Date().toISOString().split('T')[0]);
    const [specializationId, setSpecializationId] = useState<number>(1);
    const [areaId, setAreaId] = useState<number>();
    const [statusId, setStatusId] = useState<number>(1);
    const [categoryId, setCategoryId] = useState<number>(1);
    const [genderId, setGenderId] = useState<number>(1);

    const [data, setData] = useState([]);
    //const [show, setShow] = React.useState<boolean>(false);


    useEffect(() => {
       fetch('api/specialization', {method: 'GET'})
       .then(response => response.json())
       .then((data: Array<DirectoryEntity>) => setSpec(data));

       fetch('api/gender', {method: 'GET'})
       .then(response => response.json())
       .then((data: Array<DirectoryEntity>) => setGenders(data));

       fetch('api/category', {method: 'GET'})
       .then(response => response.json())
       .then((data: Array<DirectoryEntity>) => setCategories(data));
       
        fetch('api/area', {method: 'GET'})
        .then(response => response.json())
        .then((data: Array<DirectoryEntity>) => {
            setAreas(data);
            setAreaId(data[0].id);
        });

        fetch('api/status', {method: 'GET'})
        .then(response => response.json())
        .then((data: Array<DirectoryEntity>) => setStatuses(data));
    }, [])

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

    const handleSubmit = (e: Event) => {
        //e.preventDefault();
        //console.log('Сработало');
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
                    console.log(data);
                    addDoctor(data);
                    setFirstName("");
                    setLastName("");
                    setSurname("");
                }, error => console.log(error));
        }
        createDoctor();
    }

    return (
        <Modal
            open={modalIsShow}
            title = "Изменить данные врача"
            onCancel={() => showModal(false)}
            footer={[
                <Button key="submitBtn" form="doctorForm" type="primary" htmlType="submit">Сохранить</Button>,
                <Button key="closeBtn" onClick={() => showModal(false)} danger>Закрыть</Button>
            ]}
        >
            <Form id="doctorForm" onFinish={handleSubmit}>
                <label>Фамилия</label>
                <Input key="lastName" type="text" name="lastName" placeholder="Введите Фамилию" value={lastName} onChange={(e) => setLastName(e.target.value)}/><br/>
                <label>Имя</label>
                <Input key="firstName" type="text" name="firstName" placeholder="Введите Имя" value={firstName} onChange={(e) => setFirstName(e.target.value)}/><br/>
                <label>Отчество</label>
                <Input key="surname" type="text" name="surname" placeholder="Введите отчество" value={surname} onChange={(e) => setSurname(e.target.value)}/><br/>
                <label>Пол</label><br/>
                <Select key="selectGender" value={genderId} onChange={value => setGenderId(value)} style={{width: '50%'}}>
                        {
                            genders.map((s, k) => {
                                return <Select.Option value={s.id} key={k}>{s.name}</Select.Option>
                            })
                        }
                </Select><br/>
                <label>Дата рождения</label><br/>
                <Input key="dateOfBirth" type="date" name="dateOfBirth" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)}/><br/>
                <label>Специализация</label><br/>
                <Select key="selectSpecialization" value={specializationId} onChange={value => setSpecializationId(value)} style={{width: '50%'}}>
                    {specializations.map((s, k) => {
                        return <Select.Option value={s.id} key={k}>{s.name}</Select.Option>
                    })}
                </Select><br/>
                <label>Категория</label><br/>
                <Select key="selectCategory" value={categoryId} onChange={value => setCategoryId(value)} style={{width: '50%'}}>
                    {categories.map((s, k) => {
                        return <Select.Option value={s.id} key={k}>{s.name}</Select.Option>
                    })}
                </Select><br/>
                <label>Участок</label><br/>
                <Select key="selectArea" defaultValue={0} value={areaId} onChange={value => setAreaId(value)} style={{width: '50%'}}>
                    {areas.map((s, k) => {
                        return <Select.Option value={s.id} key={k}>{s.id}</Select.Option>
                    })}
                </Select><br/>
                <label>Статус</label><br/>
                <Select key="selectStatus" value={statusId} onChange={value => setStatusId(value)} style={{width: '50%'}}>
                    {statuses.map((s, k) => {
                        return <Select.Option value={s.id} key={k}>{s.name}</Select.Option>
                    })}
                </Select><br/>            
            </Form>
        </Modal>

    )
}
export default ModalDoctor;