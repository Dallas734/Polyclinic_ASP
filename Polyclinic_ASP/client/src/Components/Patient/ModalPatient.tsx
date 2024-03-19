import React, { useState, useEffect } from "react";
import PatientObj from "../Entities/PatientObj";
import { Input, Select, Modal, Button, Form } from "antd";
import DirectoryEntity from "../Entities/DirectoryEntity";
import { notification } from "antd";
import { useErrorBoundary } from "react-error-boundary";

interface PropsType {
  editingPatient: PatientObj | undefined;
  addPatient: (doctor: PatientObj) => void;
  updatePatient: (doctor: PatientObj) => void;
  modalIsShow: boolean;
  showModal: (value: boolean) => void;
}

const ModalDoctor: React.FC<PropsType> = ({
  editingPatient,
  addPatient,
  updatePatient,
  modalIsShow,
  showModal,
}) => {
  const [form] = Form.useForm();

  const [genders, setGenders] = useState<Array<DirectoryEntity>>([]);
  const [areas, setAreas] = useState<Array<DirectoryEntity>>([]);

  const [lastName, setLastName] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [address, setAddress] = useState<string | undefined>("");
  const [areaId, setAreaId] = useState<number>();
  const [polis, setPolis] = useState<string>("");
  const [workPlace, setWorkPlace] = useState<string>("");
  const [genderId, setGenderId] = useState<number>(1);

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    fetch("api/Genders", { method: "GET" })
      .then((response) => response.json())
      .then((data: Array<DirectoryEntity>) => setGenders(data))
      .catch((error) => showBoundary(error));

    fetch("api/Areas", { method: "GET" })
      .then((response) => response.json())
      .then((data: Array<DirectoryEntity>) => {
        setAreas(data);
        setAreaId(data[0].id);
      })
      .catch((error) => showBoundary(error));
  }, [showBoundary]);

  useEffect(() => {
    if (
      editingPatient !== undefined &&
      Object.keys(editingPatient).length !== 0
    ) {
      setIsEdit(true);
      form.setFieldsValue({
        lastName: editingPatient.lastName,
        firstName: editingPatient.firstName,
        surname: editingPatient.surname,
        selectGender: editingPatient.genderId,
        dateOfBirth: editingPatient.dateOfBirth,
        address: editingPatient.address,
        selectArea: editingPatient.areaId,
        polis: editingPatient.polis,
        workPlace: editingPatient.workPlace,
      });
      setLastName(editingPatient.lastName);
      setFirstName(editingPatient.firstName);
      setSurname(editingPatient.surname);
      setDateOfBirth(
        (editingPatient.dateOfBirth !== undefined
          ? new Date(editingPatient.dateOfBirth)
          : new Date()
        )
          .toISOString()
          .split("T")[0]
      );
      setAddress(editingPatient.address);
      setAreaId(editingPatient.areaId);
      setPolis(editingPatient.polis);
      setWorkPlace(editingPatient.workPlace);
      setGenderId(editingPatient.genderId);
    }
    return () => {
      form.resetFields();
      setIsEdit(false);
    };
  }, [editingPatient, form]);

  const handleSubmit = (e: Event) => {
    const createPatient = async () => {
      const patient: PatientObj = {
        firstName,
        lastName,
        surname,
        dateOfBirth,
        address,
        areaId,
        polis,
        workPlace,
        genderId,
      };

      const requestOptions: RequestInit = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patient),
      };

      return await fetch(`api/Patients`, requestOptions)
        .then((response) => response.json())
        .then(
          (data) => {
            notification.success({
              message: "Добавление завершилось удачно",
              placement: "topRight",
              duration: 2,
            });
            addPatient(data);
            form.resetFields();
            setIsEdit(false);
          },
          (error) => console.log(error)
        )
        .catch((error) => showBoundary(error));
    };

    const editPatient = async (id: number | undefined) => {
      const patient: PatientObj = {
        id,
        firstName,
        lastName,
        surname,
        dateOfBirth,
        address,
        areaId,
        polis,
        workPlace,
        genderId,
      };
      console.log(patient);
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patient),
      };

      const response = await fetch(`api/Patients/${id}`, requestOptions);
      await response
        .json()
        .then(
          (data) => {
            if (response.ok) {
              notification.success({
                message: "Обновление завершилось удачно",
                placement: "topRight",
                duration: 2,
              });
              updatePatient(data);
            }
          },
          (error) => console.log(error)
        )
        .catch((error) => showBoundary(error));
    };

    if (isEdit) {
      if (editingPatient !== undefined) {
        console.log(editingPatient.id);
        editPatient(editingPatient.id);
      }
    } else createPatient();
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  return (
    <Modal
      open={modalIsShow}
      title="Форма пациента"
      onCancel={() => showModal(false)}
      footer={[
        <Button
          key="submitBtn"
          form="patientForm"
          type="primary"
          htmlType="submit"
        >
          Сохранить
        </Button>,
        <Button key="closeBtn" onClick={() => showModal(false)} danger>
          Закрыть
        </Button>,
      ]}
    >
      <Form id="patientForm" onFinish={handleSubmit} {...layout} form={form}>
        <Form.Item
          name="lastName"
          label="Фамилия"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Введите Фамилию",
            },
            () => ({
              validator(_, value) {
                if (/^[\u0400-\u04FF]+$/.test(value)) return Promise.resolve();
                return Promise.reject(new Error("Введите корректную Фамилию"));
              },
            }),
          ]}
        >
          <Input
            key="lastName"
            type="text"
            name="lastName"
            placeholder="Введите Фамилию"
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="firstName"
          label="Имя"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Введите Имя",
            },
            () => ({
              validator(_, value) {
                if (/^[\u0400-\u04FF]+$/.test(value)) return Promise.resolve();
                return Promise.reject(new Error("Введите корректное Имя"));
              },
            }),
          ]}
        >
          <Input
            key="firstName"
            type="text"
            name="firstName"
            placeholder="Введите Имя"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="surname"
          label="Отчество"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Введите Отчество",
            },
            () => ({
              validator(_, value) {
                if (/^[\u0400-\u04FF]+$/.test(value)) return Promise.resolve();
                return Promise.reject(new Error("Введите корректное Отчество"));
              },
            }),
          ]}
        >
          <Input
            key="surname"
            type="text"
            name="surname"
            placeholder="Введите отчество"
            onChange={(e) => setSurname(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="selectGender"
          label="Пол"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Выберите Пол",
            },
          ]}
        >
          <Select
            key="selectGender"
            onChange={(value) => setGenderId(value)}
            style={{ width: "50%" }}
          >
            {genders.map((s, k) => {
              return (
                <Select.Option value={s.id} key={k}>
                  {s.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item
          name="dateOfBirth"
          label="Дата рождения"
          hasFeedback
          rules={[
            {
              type: "date",
            },
            {
              required: true,
              message: "Введите Дату рождения",
            },
          ]}
        >
          <Input
            key="dateOfBirth"
            type="date"
            name="dateOfBirth"
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="address"
          label="Адрес"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Введите Адрес",
            },
          ]}
        >
          <Input
            key="address"
            type="text"
            name="address"
            placeholder="Введите адрес"
            onChange={(e) => setAddress(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="selectArea"
          label="Участок"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Выберите Участок",
            },
          ]}
        >
          <Select
            key="selectArea"
            onChange={(value) => setAreaId(value)}
            style={{ width: "50%" }}
          >
            {areas.map((s, k) => {
              return (
                <Select.Option value={s.id} key={k}>
                  {s.id}
                </Select.Option>
              );
            })}
            <Select.Option value={null} key="0">
              "Отсутствует"
            </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="polis"
          label="Полис"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Введите Полис",
            },
            () => ({
              validator(_, value) {
                if (value.length === 16 && /^\d+$/.test(value))
                  return Promise.resolve();
                return Promise.reject(
                  new Error("Полис должен содержать 16 цифр")
                );
              },
            }),
          ]}
        >
          <Input
            key="polis"
            type="text"
            name="polis"
            placeholder="Введите полис"
            width="auto"
            onChange={(e) => setPolis(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="workPlace"
          label="Место работы"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Введите Место работы",
            },
          ]}
        >
          <Input
            key="workPlace"
            type="text"
            name="workPlace"
            placeholder="Введите место работы"
            onChange={(e) => setWorkPlace(e.target.value)}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default ModalDoctor;
