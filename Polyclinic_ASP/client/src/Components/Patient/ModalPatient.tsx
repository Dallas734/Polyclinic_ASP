import React, {useState, useEffect} from "react";
import PatientObj from "../Entities/PatientObj";
import {Input, Select, Modal, Button, Form} from "antd";
import DirectoryEntity from "../Entities/DirectoryEntity";

interface PropsType {
    editingPatient: PatientObj | undefined
    addPatient: (doctor: PatientObj) => void,
    updatePatient: (doctor: PatientObj) => void,
    method: string,
    modalIsShow: boolean,
    showModal: (value: boolean) => void
}

const ModalDoctor: React.FC<PropsType> = ({editingPatient, addPatient, updatePatient, method, modalIsShow, showModal}) => {

    const [genders, setGenders] = useState<Array<DirectoryEntity>>([]);
    const [areas, setAreas] = useState<Array<DirectoryEntity>>([]);

    const [lastName, setLastName] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [surname, setSurname] = useState<string>("");
    const [dateOfBirth, setDateOfBirth] = useState<string>(new Date().toISOString().split('T')[0]);
    const [address, setAddress] = useState<string | undefined>("");
    const [areaId, setAreaId] = useState<number>();
    const [polis, setPolis] = useState<string>("");
    const [workPlace, setWorkPlace] = useState<string>("");
    const [genderId, setGenderId] = useState<number>(1);

    const [isEdit, setIsEdit] = useState<boolean>(false);

    useEffect(() => {

       fetch('api/Genders', {method: 'GET'})
       .then(response => response.json())
       .then((data: Array<DirectoryEntity>) => setGenders(data));
       
        fetch('api/Areas', {method: 'GET'})
        .then(response => response.json())
        .then((data: Array<DirectoryEntity>) => {
            setAreas(data);
            setAreaId(data[0].id);
        });
    }, [])

    useEffect(() => {
        if (editingPatient !== undefined && Object.keys(editingPatient).length !== 0) {
            setIsEdit(true);
            setLastName(editingPatient.lastName);
            setFirstName(editingPatient.firstName);
            setSurname(editingPatient.surname);
            setDateOfBirth((editingPatient.dateOfBirth !== undefined? 
                new Date(editingPatient.dateOfBirth) : new Date()).toISOString().split('T')[0]);
            setAddress(editingPatient.address);
            setAreaId(editingPatient.areaId);
            setPolis(editingPatient.polis);
            setWorkPlace(editingPatient.workPlace);
            setGenderId(editingPatient.genderId);
        }
        return () => {
            setLastName("");
            setFirstName("");
            setSurname("");
            setDateOfBirth(new Date().toISOString().split('T')[0]);
            setAddress("");
            setPolis("");
            setWorkPlace("");
            setGenderId(1);
            setIsEdit(false);
        }
    }, [editingPatient]);

    const handleSubmit = (e: Event) => {
        const createDoctor = async () => {
            const doctor: PatientObj = {
                firstName,
                lastName,
                surname,
                dateOfBirth,
                address,
                areaId,
                polis,
                workPlace,
                genderId
            };
            
            const requestOptions: RequestInit = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(doctor)
            }

            return await fetch(`api/Patients`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    addPatient(data);
                    setFirstName("");
                    setLastName("");
                    setSurname("");
                }, error => console.log(error));
        }

        const editPatient = async (id: number | undefined) =>{
            const patient = {
                id,
                firstName,
                lastName,
                surname,
                dateOfBirth,
                address,
                areaId,
                polis,
                workPlace,
                genderId
            }
            console.log(patient);
            const requestOptions = {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(patient)
            }

            const response = await fetch(`api/Patients/${id}`, requestOptions);
                await response.json()
                .then((data) => {
                    if (response.ok) {
                        updatePatient(data);
                        setFirstName("");
                        setLastName("");
                        setSurname("");
                    }
                },
                    (error) => console.log(error)
                );
        }

        if (isEdit) 
        {
            if (editingPatient !== undefined){
                console.log(editingPatient.id);
                editPatient(editingPatient.id);
            }
        }
        else 
            createDoctor();
    }

    return (
        <Modal
            open={modalIsShow}
            title = "Форма пациента"
            onCancel={() => showModal(false)}
            footer={[
                <Button key="submitBtn" form="patientForm" type="primary" htmlType="submit">Сохранить</Button>,
                <Button key="closeBtn" onClick={() => showModal(false)} danger>Закрыть</Button>
            ]}
        >
            <Form id="patientForm" onFinish={handleSubmit}>
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
                <label>Адрес</label><br/>
                <Input key="address" type="text" name="address" placeholder="Введите адрес" value={address} onChange={(e) => setAddress(e.target.value)}/><br/>
                <label>Участок</label><br/>
                <Select key="selectArea" defaultValue={0} value={areaId} onChange={value => setAreaId(value)} style={{width: '50%'}}>
                    {areas.map((s, k) => {
                        return <Select.Option value={s.id} key={k}>{s.id}</Select.Option>
                    })}
                    <Select.Option value={null} key="0">"Отсутствует"</Select.Option>
                </Select><br/>
                <label>Полис</label><br/>
                <Input key="polis" type="text" name="polis" placeholder="Введите полис" width='auto' value={polis} onChange={(e) => setPolis(e.target.value)}/><br/>
                <label>Место работы</label><br/>
                <Input key="workPlace" type="text" name="workPlace" placeholder="Введите место работы" value={workPlace} onChange={(e) => setWorkPlace(e.target.value)}/><br/>    
            </Form>
        </Modal>

    )
}
export default ModalDoctor;