import React, {useState, useEffect} from "react";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import DoctorObj from "./DoctorObj";

interface PropsType {
    addDoctor: (doctor: DoctorObj) => void,
    updateDoctor: (doctor: DoctorObj) => void,
    method: string,
    modalIsShow: boolean,
    showModal: (value: boolean) => void
}

const ModalDoctor: React.FC<PropsType> = ({addDoctor, updateDoctor, method, modalIsShow, showModal}) => {

    const [lastName, setLastName] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [surname, setSurname] = useState<string>("");
    const [dateOfBirth, setDateOfBirth] = useState<string>(new Date().toISOString().split('T')[0]);
    const [specializationId, setSpecializationId] = useState<number>(1);
    const [areaId, setAreaId] = useState<number>(1);
    const [statusId, setStatusId] = useState<number>(1);
    const [categoryId, setCategoryId] = useState<number>(1);
    const [genderId, setGenderId] = useState<number>(1);

    const [data, setData] = React.useState([]);
    //const [show, setShow] = React.useState<boolean>(false);


    useEffect(() => {
       //setShow(true);
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
        <Modal show={modalIsShow} onHide={() => showModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Изменить данные врача</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                    <label>Фамилия: </label>
                    <input type="text" name="lastName" placeholder="Введите Фамилию" value={lastName} onChange={(e) => setLastName(e.target.value)}/><br/>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => showModal(false)}>
                        Close
                    </Button>
                    {/* Не забыть onClick() на основе method */}
                    <Button variant="primary">

                    </Button>
                </Modal.Footer>
            </Modal>
    )
}
export default ModalDoctor;