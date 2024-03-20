import React, { useState, useEffect } from "react";
import DoctorObj from "../Entities/DoctorObj";
import ModalDoctor from "./ModalDoctor";
import { Button, Table, Input } from "antd";
import type { TableProps } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { ColumnFilterItem } from "antd/es/table/interface";
import DirectoryEntity from "../Entities/DirectoryEntity";
import { notification } from "antd";
import { useErrorBoundary } from "react-error-boundary";
import axios from "axios";

interface PropsType {}

const Doctor: React.FC<PropsType> = () => {
  const [doctors, setDoctors] = useState<Array<DoctorObj>>([]);
  const [areas, setAreas] = useState<Array<DirectoryEntity>>([]);
  const [statuses, setStatuses] = useState<Array<DirectoryEntity>>([]);
  const [genders, setGenders] = useState<Array<DirectoryEntity>>([]);
  const [specializations, setSpec] = useState<Array<DirectoryEntity>>([]);
  const [categories, setCategories] = useState<Array<DirectoryEntity>>([]);
  const [modalIsShow, setShowModal] = useState<boolean>(false);
  const [editingDoctor, setEditingDoctor] = useState<DoctorObj>();

  const { showBoundary } = useErrorBoundary();

  const removeDoctor = (removeId: number | undefined) =>
    setDoctors(doctors.filter(({ id }) => id !== removeId));
  const updateDoctor = (doctor: DoctorObj) =>
    setDoctors(
      doctors.map((o) => {
        if (o.id === doctor.id) return doctor;
        return o;
      })
    );
  const addDoctor = (doctor: DoctorObj) => setDoctors([...doctors, doctor]);

  useEffect(() => {
    const getDoctors = async () => {
      try
      {
        const response = await axios.get<Array<DoctorObj>>("api/Doctors")
        setDoctors(response.data)
      }
      catch (error)
      {
        showBoundary(error)
      }
    };

    const getAreas = async () => {
      try {
        const response = await axios.get<Array<DirectoryEntity>>("api/Areas");
        if (response.status === 200) setAreas(response.data);
        else console.log(response.statusText);
      } catch (error) {
        showBoundary(error);
      }
    };
    
    const getStatuses = async () => {
      try {
        const response = await axios.get<Array<DirectoryEntity>>("api/Statuses");
        if (response.status === 200) setStatuses(response.data);
        else console.log(response.statusText);
      } catch (error) {
        showBoundary(error);
      }
    };

    const getGenders = async () => {
      try {
        const response = await axios.get<Array<DirectoryEntity>>("api/Genders");
        if (response.status === 200) setGenders(response.data)
        else console.log(response.statusText);
      } catch (error) {
        showBoundary(error);
      }
    };

    const getCategories = async () => {
      try {
        const response = await axios.get<Array<DirectoryEntity>>("api/Categories");
        if (response.status === 200) setCategories(response.data)
        else console.log(response.statusText);
      } catch (error) {
        showBoundary(error);
      }
    };

    const getSpecs = async () => {
      try {
        const response = await axios.get<Array<DirectoryEntity>>("api/Specializations");
        if (response.status === 200) setSpec(response.data);
        else console.log(response.statusText);
      } catch (error) {
        showBoundary(error);
      }
    };

    getAreas();
    getStatuses();
    getGenders();
    getCategories();
    getSpecs();
    getDoctors();
  }, [showBoundary]);

  const deleteDoctor = async (id: number | undefined) => {
    try{
      const response = await axios.delete(`api/Doctors/${id}`);
      if (response.status === 200)
      {
        notification.success({
          message: "Удаление завершилось удачно",
          placement: "topRight",
          duration: 2,
        });
        removeDoctor(id);
      }
      else
      {
        console.log(response.statusText);
        notification.error({
          message: "Ошибка",
          placement: "topRight",
          duration: 2,
        });
      }
    }
    catch (error)
    {
      showBoundary(error)
    }
  };

  const showModal = (value: boolean) => {
    setShowModal(value);
  };

  const handleAddBtn = (value: boolean) => {
    setEditingDoctor(undefined);
    setShowModal(value);
  };

  const handleEditBtn = (obj: DoctorObj) => {
    setEditingDoctor(obj);
    setShowModal(true);
  };

  const createFilterArray = (
    elements: Array<DirectoryEntity>
  ): Array<ColumnFilterItem> => {
    return elements.map<ColumnFilterItem>((a) => ({
      text: a.name,
      value: a.id,
    }));
  };

  const columns: TableProps<DoctorObj>["columns"] = [
    {
      title: "Фамилия",
      dataIndex: "lastName",
      key: "lastName",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <React.Fragment>
          <Input
            autoFocus
            placeholder="Введите Фамилию"
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => confirm()}
            onBlur={() => confirm()}
          ></Input>
          <Button onClick={() => confirm()} type="primary" key="searchButton">
            Поиск
          </Button>
          <Button
            onClick={() => {
              clearFilters ? clearFilters() : setSelectedKeys([]);
              confirm();
            }}
            type="primary"
            danger
            key="dropFilter"
          >
            Сброс фильтра
          </Button>
        </React.Fragment>
      ),
      filterIcon: () => <SearchOutlined />,
      onFilter: (value, record) =>
        record.lastName.toLowerCase().includes(value.toString().toLowerCase()),
    },
    {
      title: "Имя",
      dataIndex: "firstName",
      key: "firstName",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <React.Fragment>
          <Input
            autoFocus
            placeholder="Введите Имя"
            value={selectedKeys[0]}
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : []);
            }}
            onPressEnter={() => confirm()}
            onBlur={() => confirm()}
            key="nameInput"
          ></Input>
          <Button onClick={() => confirm()} type="primary">
            Поиск
          </Button>
          <Button
            onClick={() => {
              clearFilters ? clearFilters() : setSelectedKeys([]);
              confirm();
            }}
            type="primary"
            danger
          >
            Сброс фильтра
          </Button>
        </React.Fragment>
      ),
      filterIcon: () => <SearchOutlined />,
      onFilter: (value, record) =>
        record.firstName.toLowerCase().includes(value.toString().toLowerCase()),
    },
    {
      title: "Отчество",
      dataIndex: "surname",
      key: "surname",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <React.Fragment>
          <Input
            autoFocus
            placeholder="Введите Отчество"
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => confirm()}
            onBlur={() => confirm()}
          ></Input>
          <Button onClick={() => confirm()} type="primary">
            Поиск
          </Button>
          <Button
            onClick={() => {
              clearFilters ? clearFilters() : setSelectedKeys([]);
              confirm();
            }}
            type="primary"
            danger
          >
            Сброс фильтра
          </Button>
        </React.Fragment>
      ),
      filterIcon: () => <SearchOutlined />,
      onFilter: (value, record) =>
        record.surname.toLowerCase().includes(value.toString().toLowerCase()),
    },
    {
      title: "Пол",
      dataIndex: "genderName",
      key: "genderName",
      filters: createFilterArray(genders),
      onFilter: (value, record) => record.genderId === value,
    },
    { title: "Дата рождения", dataIndex: "dateOfBirth", key: "dateOfBirth" },
    {
      title: "Специализация",
      dataIndex: "specializationName",
      key: "specializationName",
      filters: createFilterArray(specializations),
      onFilter: (value, record) => record.specializationId === value,
    },
    {
      title: "Категория",
      dataIndex: "categoryName",
      key: "categoryName",
      filters: createFilterArray(categories),
      onFilter: (value, record) => record.categoryId === value,
    },
    {
      title: "Участок",
      dataIndex: "areaId",
      key: "areaId",
      filters: areas.map<ColumnFilterItem>((a) => ({
        text: a.id,
        value: a.id,
      })),
      onFilter: (value, record) => record.areaId === value,
    },
    {
      title: "Статус",
      dataIndex: "statusName",
      key: "statusName",
      filters: createFilterArray(statuses),
      onFilter: (value, record) => record.statusId === value,
    },
    {
      key: "x",
      render: (row: DoctorObj) => (
        <Button
          key="deleteBtn"
          type="primary"
          onClick={() => deleteDoctor(row.id)}
          danger
        >
          Удалить
        </Button>
      ),
    },
    {
      key: "e",
      render: (row: DoctorObj) => (
        <Button
          key="editBtn"
          type="primary"
          style={{ background: "green", borderColor: "green" }}
          onClick={() => handleEditBtn(row)}
        >
          Изменить
        </Button>
      ),
    },
  ];
  return (
    <React.Fragment>
      <ModalDoctor
        editingDoctor={editingDoctor}
        updateDoctor={updateDoctor}
        addDoctor={addDoctor}
        modalIsShow={modalIsShow}
        showModal={showModal}
      />
      <div>
        <h3>Список врачей</h3>
        <Button key="addBtn" type="primary" onClick={() => handleAddBtn(true)}>
          Добавить
        </Button>
      </div>
      <Table
        key="doctorTable"
        dataSource={doctors}
        columns={columns}
        pagination={{ pageSize: 10 }}
        scroll={{ y: 450 }}
        bordered
      />
    </React.Fragment>
  );
};
export default Doctor;
