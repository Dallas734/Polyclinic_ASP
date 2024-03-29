import React, { useState, useEffect } from "react";
import { Button, Input, Table } from "antd";
import type { TableProps } from "antd";
import PatientObj from "../Entities/PatientObj";
import ModalPatient from "./ModalPatient";
import DirectoryEntity from "../Entities/DirectoryEntity";
import { ColumnFilterItem } from "antd/es/table/interface";
import { SearchOutlined } from "@ant-design/icons";
import { notification } from "antd";
import { useErrorBoundary } from "react-error-boundary";
import axios from "axios";

interface PropsType {}

const Patient: React.FC<PropsType> = () => {
  const [patients, setPatients] = useState<Array<PatientObj>>([]);
  const [modalIsShow, setShowModal] = useState<boolean>(false);
  const [editingPatient, setEditingPatient] = useState<PatientObj>();

  const [areas, setAreas] = useState<Array<DirectoryEntity>>([]);
  const [genders, setGenders] = useState<Array<DirectoryEntity>>([]);

  const { showBoundary } = useErrorBoundary();

  const removePatient = (removeId: number | undefined) =>
    setPatients(patients.filter(({ id }) => id !== removeId));
  const updatePatient = (doctor: PatientObj) =>
    setPatients(
      patients.map((o) => {
        if (o.id === doctor.id) return doctor;
        return o;
      })
    );
  const addDoctor = (doctor: PatientObj) => setPatients([...patients, doctor]);

  useEffect(() => {
    const getPatients = async () => {
      try {
        const response = await axios.get<Array<PatientObj>>("api/Patients");
        if (response.status === 200) setPatients(response.data);
        else console.log(response.statusText);
      } catch (error) {
        showBoundary(error);
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

    const getGenders = async () => {
      try {
        const response = await axios.get<Array<DirectoryEntity>>("api/Genders");
        if (response.status === 200) setGenders(response.data);
        else console.log(response.statusText);
      } catch (error) {
        showBoundary(error);
      }
    };

    getAreas();
    getGenders();
    getPatients();
  }, [showBoundary]);

  const deletePatient = async (id: number | undefined) => {
    try {
      const response = await axios.delete(`api/Patients/${id}`);
      if (response.status === 200) {
        notification.success({
          message: "Удаление завершилось удачно",
          placement: "topRight",
          duration: 2,
        });
        removePatient(id);
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

  const showModal = (value: boolean) => {
    setShowModal(value);
  };

  const handleAddBtn = (value: boolean) => {
    setEditingPatient(undefined);
    setShowModal(value);
  };

  const handleEditBtn = (obj: PatientObj) => {
    setEditingPatient(obj);
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

  const columns: TableProps<PatientObj>["columns"] = [
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
        <>
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
        </>
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
        <>
          <Input
            autoFocus
            placeholder="Введите Имя"
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
        </>
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
        <>
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
        </>
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
      title: "Полис",
      dataIndex: "polis",
      key: "polis",
      width: "12%",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <>
          <Input
            autoFocus
            placeholder="Введите Полис"
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
        </>
      ),
      filterIcon: () => <SearchOutlined />,
      onFilter: (value, record) =>
        record.polis.toLowerCase().includes(value.toString().toLowerCase()),
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
      title: "Адрес",
      dataIndex: "address",
      key: "address",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <>
          <Input
            autoFocus
            placeholder="Введите Адрес"
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
        </>
      ),
      filterIcon: () => <SearchOutlined />,
      onFilter: (value, record) =>
        record.address
          ? record.address
              .toLowerCase()
              .includes(value.toString().toLowerCase())
          : false,
    },
    {
      title: "Место работы",
      dataIndex: "workPlace",
      key: "workPlace",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <>
          <Input
            autoFocus
            placeholder="Введите Место работы"
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
        </>
      ),
      filterIcon: () => <SearchOutlined />,
      onFilter: (value, record) =>
        record.workPlace.toLowerCase().includes(value.toString().toLowerCase()),
    },
    {
      key: "x",
      render: (row: PatientObj) => (
        <Button
          key="deleteBtn"
          type="primary"
          onClick={() => deletePatient(row.id)}
          danger
        >
          Удалить
        </Button>
      ),
    },
    {
      key: "e",
      render: (row: PatientObj) => (
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
      {
        <ModalPatient
          editingPatient={editingPatient}
          updatePatient={updatePatient}
          addPatient={addDoctor}
          modalIsShow={modalIsShow}
          showModal={showModal}
        />
      }
      <div>
        <h3>Список пациентов</h3>
        <Button key="addBtn" type="primary" onClick={() => handleAddBtn(true)}>
          Добавить
        </Button>
      </div>
      <Table
        key="doctorTable"
        dataSource={patients}
        columns={columns}
        pagination={{ pageSize: 10 }}
        scroll={{ y: 450 }}
        bordered
      />
    </React.Fragment>
  );
};
export default Patient;
