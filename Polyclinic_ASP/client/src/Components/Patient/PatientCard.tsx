import React, { useState, useEffect } from "react";
import { Table, Select, Input, Button } from "antd";
import VisitObj from "../Entities/VisitObj";
import DirectoryEntity from "../Entities/DirectoryEntity";
import PatientObj from "../Entities/PatientObj";
import type { TableProps } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { ColumnFilterItem } from "antd/es/table/interface";
import { useErrorBoundary } from "react-error-boundary";
import { Fetch } from "../../axiosInstance";

interface PropsType {}

const PatientCard: React.FC<PropsType> = () => {
  const [areas, setAreas] = useState<Array<DirectoryEntity>>([]);
  const [patients, setPatients] = useState<Array<PatientObj>>([]);
  const [areaId, setAreaId] = useState<number | undefined>(undefined);
  const [patientId, setPatientId] = useState<number>();
  const [specializations, setSpec] = useState<Array<DirectoryEntity>>([]);
  const [cardVisits, setCardVisits] = useState<Array<VisitObj>>([]);

  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    const getAreas = async () => {
      try {
        const response = await Fetch.get<Array<DirectoryEntity>>(`api/Areas`);
        if (response.status === 200) setAreas(response.data);
        else console.log(response.statusText);
      } catch (error) {
        showBoundary(error);
      }
    };

    const getSpecs = async () => {
      try {
        const response = await Fetch.get<Array<DirectoryEntity>>(
          `api/Specializations`
        );
        if (response.status === 200) setSpec(response.data);
        else console.log(response.statusText);
      } catch (error) {
        showBoundary(error);
      }
    };

    getAreas();
    getSpecs();
  }, [showBoundary]);

  useEffect(() => {
    const getPatientByArea = async () => {
      try {
        const response = await Fetch.get<Array<PatientObj>>(
          `api/patients/byArea?areaId=${areaId}`
        );
        if (response.status === 200) setPatients(response.data);
        else console.log(response.statusText);
      } catch (error) {
        showBoundary(error);
      }
    };

    getPatientByArea();
  }, [areaId, showBoundary]);

  useEffect(() => {
    const getPatientCard = async () => {
      try {
        const response = await Fetch.get<Array<VisitObj>>(
          `api/patients/card?patientId=${patientId}`
        );
        if (response.status === 200) setCardVisits(await response.data);
        else console.log(response.statusText);
      } catch (error) {
        showBoundary(error);
      }
    };

    getPatientCard();
  }, [patientId, showBoundary]);

  const createFilterArray = (
    elements: Array<DirectoryEntity>
  ): Array<ColumnFilterItem> => {
    return elements.map<ColumnFilterItem>((a) => ({
      text: a.name,
      value: a.id,
    }));
  };

  const columns: TableProps<VisitObj>["columns"] = [
    {
      title: "Врач",
      dataIndex: "doctorFullName",
      key: "doctorFullName",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <>
          <Input
            autoFocus
            placeholder="Введите ФИО врача"
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
        record.doctorFullName
          ? record.doctorFullName
              .toLowerCase()
              .includes(value.toString().toLowerCase())
          : false,
    },
    {
      title: "Специализация",
      dataIndex: ["specialization", "name"],
      key: "specialization",
      filters: createFilterArray(specializations),
      onFilter: (value, record) =>
        record.specialization ? record.specialization.id === value : false,
    },
    { title: "Дата", dataIndex: "dateT", key: "dateT" },
    { title: "Время", dataIndex: "timeT", key: "timeT" },
    { title: "Диагноз", dataIndex: ["diagnosis", "name"], key: "diagnosis" },
    { title: "Процедура", dataIndex: ["procedure", "name"], key: "procedure" },
    { title: "Рецепт", dataIndex: "recipe", key: "recipe" },
  ];

  return (
    <React.Fragment>
      <div>
        <h3>Карта пациента</h3>
      </div>
      <br />
      <div>
        <ul>
          <li>
            <label>Участок</label>
            <Select
              key="selectArea"
              value={areaId}
              onChange={(value) => setAreaId(value)}
              style={{ width: "150px" }}
            >
              {areas.map((a, k) => {
                return (
                  <Select.Option value={a.id} key={k}>
                    {a.name}
                  </Select.Option>
                );
              })}
            </Select>
          </li>
          <li>
            <label>Пациент</label>
            <Select
              key="selectPatient"
              value={patientId}
              onChange={(value) => setPatientId(value)}
              style={{ width: "300px" }}
              optionFilterProp="children"
              showSearch
            >
              {patients.map((s, k) => {
                return (
                  <Select.Option value={s.id} key={k}>
                    {s.fullName}
                  </Select.Option>
                );
              })}
            </Select>
          </li>
        </ul>
      </div>
      <br />
      <Table
        key="patientTable"
        dataSource={cardVisits}
        columns={columns}
        pagination={{ pageSize: 10 }}
        scroll={{ y: 450 }}
        bordered
      />
    </React.Fragment>
  );
};

export default PatientCard;
