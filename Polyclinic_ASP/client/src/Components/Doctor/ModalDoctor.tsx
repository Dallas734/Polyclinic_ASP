import React, {useState, useEffect} from "react";
import DoctorObj from "../Entities/DoctorObj";
import {Input, Select, Modal, Button, Form} from "antd";
import DirectoryEntity from "../Entities/DirectoryEntity";

interface PropsType {
    editingDoctor: DoctorObj | undefined
    addDoctor: (doctor: DoctorObj) => void,
    updateDoctor: (doctor: DoctorObj) => void,
    method: string,
    modalIsShow: boolean,
    showModal: (value: boolean) => void
}

const ModalDoctor: React.FC<PropsType> = ({editingDoctor, addDoctor, updateDoctor, method, modalIsShow, showModal}) => {

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

    const [isEdit, setIsEdit] = useState<boolean>(false);

    //const [show, setShow] = React.useState<boolean>(false);


    useEffect(() => {
       fetch('api/Specializations', {method: 'GET'})
       .then(response => response.json())
       .then((data: Array<DirectoryEntity>) => setSpec(data));

       fetch('api/Genders', {method: 'GET'})
       .then(response => response.json())
       .then((data: Array<DirectoryEntity>) => setGenders(data));

       fetch('api/Categories', {method: 'GET'})
       .then(response => response.json())
       .then((data: Array<DirectoryEntity>) => setCategories(data));
       
        fetch('api/Areas', {method: 'GET'})
        .then(response => response.json())
        .then((data: Array<DirectoryEntity>) => {
            setAreas(data);
            setAreaId(data[0].id);
        });

        fetch('api/Statuses', {method: 'GET'})
        .then(response => response.json())
        .then((data: Array<DirectoryEntity>) => setStatuses(data));
    }, [])

    useEffect(() => {
        if (editingDoctor !== undefined && Object.keys(editingDoctor).length !== 0) {
            setIsEdit(true);
            setLastName(editingDoctor.lastName);
            setFirstName(editingDoctor.firstName);
            setSurname(editingDoctor.surname);
            setDateOfBirth((editingDoctor.dateOfBirth !== undefined? 
                new Date(editingDoctor.dateOfBirth) : new Date()).toISOString().split('T')[0]);
            setSpecializationId(editingDoctor.specializationId);
            setAreaId(editingDoctor.areaId);
            setStatusId(editingDoctor.statusId);
            setCategoryId(editingDoctor.categoryId);
            setGenderId(editingDoctor.genderId);
        }
        return () => {
            setLastName("");
            setFirstName("");
            setSurname("");
            setDateOfBirth(new Date().toISOString().split('T')[0]);
            setSpecializationId(1);
            setStatusId(1);
            setCategoryId(1);
            setGenderId(1);
            setIsEdit(false);
        }
    }, [editingDoctor]);
    
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

            return await fetch(`api/Doctors`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    addDoctor(data);
                    setFirstName("");
                    setLastName("");
                    setSurname("");
                }, error => console.log(error));
        }

        const editDoctor = async (id: number | undefined) =>{
            const doctor: DoctorObj = {
                id,
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

            const requestOptions = {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(doctor)
            }

            const response = await fetch(`api/Doctors/${id}`, requestOptions);
                await response.json()
                .then((data) => {
                    if (response.ok) {
                        updateDoctor(data);
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
            if (editingDoctor !== undefined){
                console.log(editingDoctor.id);
                editDoctor(editingDoctor.id);
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
            title = "Форма врача"
            onCancel={() => showModal(false)}
            footer={[
                <Button key="submitBtn" form="doctorForm" type="primary" htmlType="submit">Сохранить</Button>,
                <Button key="closeBtn" onClick={() => showModal(false)} danger>Закрыть</Button>
            ]}
        >
            <Form id="doctorForm" onFinish={handleSubmit} {...layout}>
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
                            message: "Выберите пол"
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
                    name="selectSpecialization"
                    label="Специализация"
                    rules={[
                        {
                            required: true,
                            message: "Выберите Специализацию"
                        }
                    ]}
                >
                    <Select key="selectSpecialization" value={specializationId} onChange={value => setSpecializationId(value)} style={{width: '50%'}}>
                        {specializations.map((s, k) => {
                            return <Select.Option value={s.id} key={k}>{s.name}</Select.Option>
                        })}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="selectCategory"
                    label="Категория"
                    rules={[
                        {
                            required: true,
                            message: "Выберите Категорию"
                        }
                    ]}
                >
                    <Select key="selectCategory" value={categoryId} onChange={value => setCategoryId(value)} style={{width: '50%'}}>
                        {categories.map((s, k) => {
                            return <Select.Option value={s.id} key={k}>{s.name}</Select.Option>
                        })}
                    </Select>
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
                    name="selectStatus"
                    label="Статус"
                    rules={[
                        {
                            required: true,
                            message: "Выберите Статус"
                        }
                    ]}
                >
                    <Select key="selectStatus" value={statusId} onChange={value => setStatusId(value)} style={{width: '50%'}}>
                        {statuses.map((s, k) => {
                            return <Select.Option value={s.id} key={k}>{s.name}</Select.Option>
                        })}
                    </Select>
                </Form.Item>            
            </Form>
        </Modal>

    )
}
export default ModalDoctor;