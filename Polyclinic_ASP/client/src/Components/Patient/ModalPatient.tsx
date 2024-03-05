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
            const patient: PatientObj = {
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
                body: JSON.stringify(patient)
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
            const patient : PatientObj= {
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

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

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
            <Form id="patientForm" onFinish={handleSubmit} {...layout}>
            <Form.Item
                    name="lastName"
                    label="Фамилия"
                    hasFeedback
                    rules={[
                        {
                            required: true, 
                            message: "Введите Фамилию"
                        },
                        () => ({
                            validator(_, value) {
                                if (/^[\u0400-\u04FF]+$/.test(value))
                                    return Promise.resolve();
                                return Promise.reject(new Error("Введите корректную Фамилию"));
                            }
                        })
                    ]}
                >
                    <Input key="lastName" type="text" name="lastName" placeholder="Введите Фамилию" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                </Form.Item>
                <Form.Item
                    name="firstName"
                    label="Имя"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: "Введите Имя" 
                        },
                        () => ({
                            validator(_, value) {
                                if (/^[\u0400-\u04FF]+$/.test(value))
                                    return Promise.resolve();
                                return Promise.reject(new Error("Введите корректное Имя"));
                            }
                        })
                    ]}
                >
                    <Input key="firstName" type="text" name="firstName" placeholder="Введите Имя" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                </Form.Item>
                <Form.Item
                    name="surname"
                    label="Отчество"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: "Введите Отчество"
                        },
                        () => ({
                            validator(_, value) {
                                if (/^[\u0400-\u04FF]+$/.test(value))
                                    return Promise.resolve();
                                return Promise.reject(new Error("Введите корректное Отчество"));
                            }
                        })
                    ]}
                >
                    <Input key="surname" type="text" name="surname" placeholder="Введите отчество" value={surname} onChange={(e) => setSurname(e.target.value)}/>
                </Form.Item>
                <Form.Item
                    name="selectGender"
                    label="Пол"
                    rules={[
                        {
                            required: true,
                            message: "Выберите Пол"
                        }
                    ]}
                >
                    <Select key="selectGender" value={genderId} onChange={value => setGenderId(value)} style={{width: '50%'}}>
                        {
                            genders.map((s, k) => {
                                return <Select.Option value={s.id} key={k}>{s.name}</Select.Option>
                            })
                        }
                    </Select>
                </Form.Item>
                <Form.Item
                    name="dateOfBirth"
                    label="Дата рождения"
                    rules={[
                        {
                            type: "date"
                        },
                        {
                            required: true,
                            message: "Введите Дату рождения"
                        }
                    ]}
                >
                    <Input key="dateOfBirth" type="date" name="dateOfBirth" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)}/>
                </Form.Item>
                <Form.Item
                    name="address"
                    label="Адрес"
                    rules={[
                        {
                            required: true,
                            message: "Введите Адрес"
                        }
                    ]}
                >
                    <Input key="address" type="text" name="address" placeholder="Введите адрес" value={address} onChange={(e) => setAddress(e.target.value)}/>
                </Form.Item>
                <Form.Item
                    name="selectArea"
                    label="Участок"
                    rules={[
                        {
                            required: true,
                            message: "Выберите Участок"
                        }
                    ]}
                >
                    <Select key="selectArea" defaultValue={0} value={areaId} onChange={value => setAreaId(value)} style={{width: '50%'}}>
                        {areas.map((s, k) => {
                            return <Select.Option value={s.id} key={k}>{s.id}</Select.Option>
                        })}
                        <Select.Option value={null} key="0">"Отсутствует"</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="polis"
                    label="Полис"
                    rules={[
                        {
                            required: true,
                            message: "Введите Полис"
                        },
                        () => ({
                            validator(_, value) {
                                if (value.length === 16 && /^\d+$/.test(value))
                                    return Promise.resolve();
                                return Promise.reject(new Error("Полис должен содержать 16 цифр"));
                            }
                        })
                    ]}
                >
                    <Input key="polis" type="text" name="polis" placeholder="Введите полис" width='auto' value={polis} onChange={(e) => setPolis(e.target.value)}/>
                </Form.Item>
                <Form.Item
                    name="workPlace"
                    label="Место работы"
                    rules={[
                        {
                            required: true,
                            message: "Введите Место работы"
                        }
                    ]}
                >
                    <Input key="workPlace" type="text" name="workPlace" placeholder="Введите место работы" value={workPlace} onChange={(e) => setWorkPlace(e.target.value)}/>
                </Form.Item>   
            </Form>
        </Modal>

    )
}
export default ModalDoctor;