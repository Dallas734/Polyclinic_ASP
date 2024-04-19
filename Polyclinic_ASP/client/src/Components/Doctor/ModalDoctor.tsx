import React, { useState, useEffect } from "react";
import DoctorObj from "../Entities/DoctorObj";
import { Input, Select, Modal, Button, Form } from "antd";
import DirectoryEntity from "../Entities/DirectoryEntity";
import { notification } from "antd";
import { useErrorBoundary } from "react-error-boundary";
import Fetch from "../../Axios/axiosInstance";
import { AxiosError } from "axios";

interface PropsType {
  editingDoctor: DoctorObj | undefined;
  addDoctor: (doctor: DoctorObj) => void;
  updateDoctor: (doctor: DoctorObj) => void;
  modalIsShow: boolean;
  showModal: (value: boolean) => void;
}

const ModalDoctor: React.FC<PropsType> = ({
  editingDoctor,
  addDoctor,
  updateDoctor,
  modalIsShow,
  showModal,
}) => {
  const [form] = Form.useForm();

  const [specializations, setSpec] = useState<Array<DirectoryEntity>>([]);
  const [genders, setGenders] = useState<Array<DirectoryEntity>>([]);
  const [categories, setCategories] = useState<Array<DirectoryEntity>>([]);
  const [areas, setAreas] = useState<Array<DirectoryEntity>>([]);
  const [statuses, setStatuses] = useState<Array<DirectoryEntity>>([]);

  const [lastName, setLastName] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [specializationId, setSpecializationId] = useState<number>(1);
  const [areaId, setAreaId] = useState<number>();
  const [statusId, setStatusId] = useState<number>(1);
  const [categoryId, setCategoryId] = useState<number>(1);
  const [genderId, setGenderId] = useState<number>(1);

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    const getSpecs = async () => {
      try {
        const response = await Fetch.get<Array<DirectoryEntity>>(
          `api/Specializations`
        );
        if (response.status === 200) setSpec(response.data);
        else console.log(response.statusText);
      } catch (error) {
        const errors = error as AxiosError;
        if (errors.response?.status === 401)
          showBoundary("У вас нет доступа к этому ресурсу!");
        else showBoundary(error);
      }
    };

    const getGenders = async () => {
      try {
        const response = await Fetch.get<Array<DirectoryEntity>>(`api/Genders`);
        if (response.status === 200) setGenders(response.data);
        else console.log(response.statusText);
      } catch (error) {
        showBoundary(error);
      }
    };

    const getCategories = async () => {
      try {
        const response = await Fetch.get<Array<DirectoryEntity>>(
          `api/Categories`
        );
        if (response.status === 200) setCategories(response.data);
        else console.log(response.statusText);
      } catch (error) {
        showBoundary(error);
      }
    };

    const getAreas = async () => {
      try {
        const response = await Fetch.get<Array<DirectoryEntity>>(`api/Areas`);
        if (response.status === 200) {
          setAreas(response.data);
          setAreaId(response.data[0].id);
        } else console.log(response.statusText);
      } catch (error) {
        showBoundary(error);
      }
    };

    const getStatuses = async () => {
      try {
        const response = await Fetch.get<Array<DirectoryEntity>>(
          `api/Categories`
        );
        if (response.status === 200) setStatuses(response.data);
        else console.log(response.statusText);
      } catch (error) {
        showBoundary(error);
      }
    };

    getSpecs();
    getGenders();
    getCategories();
    getAreas();
    getStatuses();
  }, [showBoundary]);

  useEffect(() => {
    if (
      editingDoctor !== undefined &&
      Object.keys(editingDoctor).length !== 0
    ) {
      setIsEdit(true);
      form.setFieldsValue({
        lastName: editingDoctor.lastName,
        firstName: editingDoctor.firstName,
        surname: editingDoctor.surname,
        selectGender: editingDoctor.genderId,
        dateOfBirth:
          editingDoctor.dateOfBirth !== undefined
            ? new Date(editingDoctor.dateOfBirth).toISOString().split("T")[0]
            : new Date().toISOString().split("T")[0],
        selectSpecialization: editingDoctor.specializationId,
        selectCategory: editingDoctor.categoryId,
        selectArea: editingDoctor.areaId,
        selectStatus: editingDoctor.statusId,
      });
      setLastName(editingDoctor.lastName);
      setFirstName(editingDoctor.firstName);
      setSurname(editingDoctor.surname);
      setDateOfBirth(
        (editingDoctor.dateOfBirth !== undefined
          ? new Date(editingDoctor.dateOfBirth)
          : new Date()
        )
          .toISOString()
          .split("T")[0]
      );
      setSpecializationId(editingDoctor.specializationId);
      setCategoryId(editingDoctor.categoryId);
      setAreaId(editingDoctor.areaId);
      setStatusId(editingDoctor.statusId);
    }
    return () => {
      form.resetFields();
      setIsEdit(false);
    };
  }, [editingDoctor, form]);

  const handleSubmit = (e: Event) => {
    const createDoctor = async () => {
      try {
        const doctor: DoctorObj = {
          firstName,
          lastName,
          surname,
          dateOfBirth,
          specializationId,
          areaId,
          statusId,
          categoryId,
          genderId,
        };

        const response = await Fetch.post<DoctorObj>(`api/Doctors`, doctor);
        if (response.status === 201) {
          notification.success({
            message: "Добаление завершилось удачно",
            placement: "topRight",
            duration: 2,
          });
          addDoctor(response.data);
          form.resetFields();
          setIsEdit(false);
        } else {
          console.log(response.statusText);
          notification.error({
            message: "Ошибка",
            placement: "topRight",
            duration: 2,
          });
        }
      } catch (error) {
        showBoundary(error);
      }
    };

    const editDoctor = async (id: number | undefined) => {
      try {
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
          genderId,
        };

        const response = await Fetch.put<DoctorObj>(
          `api/Doctors/${id}`,
          doctor
        );
        if (response.status === 201) {
          notification.success({
            message: "Обновление завершилось удачно",
            placement: "topRight",
            duration: 2,
          });
          updateDoctor(response.data);
        } else {
          console.log(response.statusText);
          notification.error({
            message: "Ошибка",
            placement: "topRight",
            duration: 2,
          });
        }
      } catch (error) {
        showBoundary(error);
      }
    };

    if (isEdit) {
      if (editingDoctor !== undefined) {
        console.log(editingDoctor.id);
        editDoctor(editingDoctor.id);
      }
    } else createDoctor();
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  return (
    <Modal
      open={modalIsShow}
      title="Форма врача"
      onCancel={() => showModal(false)}
      footer={[
        <Button
          key="submitBtn"
          form="doctorForm"
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
      <Form id="doctorForm" onFinish={handleSubmit} {...layout} form={form}>
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
            value={lastName}
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
              message: "Выберите пол",
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
          name="selectSpecialization"
          label="Специализация"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Выберите Специализацию",
            },
          ]}
        >
          <Select
            key="selectSpecialization"
            onChange={(value) => setSpecializationId(value)}
            style={{ width: "50%" }}
          >
            {specializations.map((s, k) => {
              return (
                <Select.Option value={s.id} key={k}>
                  {s.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item
          name="selectCategory"
          label="Категория"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Выберите Категорию",
            },
          ]}
        >
          <Select
            key="selectCategory"
            onChange={(value) => setCategoryId(value)}
            style={{ width: "50%" }}
          >
            {categories.map((s, k) => {
              return (
                <Select.Option value={s.id} key={k}>
                  {s.name}
                </Select.Option>
              );
            })}
          </Select>
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
          name="selectStatus"
          label="Статус"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Выберите Статус",
            },
          ]}
        >
          <Select
            key="selectStatus"
            onChange={(value) => setStatusId(value)}
            style={{ width: "50%" }}
          >
            {statuses.map((s, k) => {
              return (
                <Select.Option value={s.id} key={k}>
                  {s.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default ModalDoctor;
