import "./TalonsTable.css";
import VisitObj from "../Entities/VisitObj";
import type { TableProps } from "antd";
import { Table, Select, Input, Button, DatePicker } from "antd";
import { Label } from "reactstrap";
import React, { useState, useEffect } from "react";
import UserObj from "../Entities/UserObj";
import DirectoryEntity from "../Entities/DirectoryEntity";
import { ConfigProvider } from "antd/lib";
import moment from "moment";
import locale from "antd/locale/ru_RU";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import "moment/locale/ru";
import { notification } from "antd";
import { useErrorBoundary } from "react-error-boundary";
import axios from "axios";

interface PropsType {
  user: UserObj | null;
}

const columns: TableProps<VisitObj>["columns"] = [
  { title: "Время", dataIndex: "timeT", key: "timeT" },
  { title: "Статус", dataIndex: "visitStatusName", key: "visitStatusName" },
];

const DoctorsTalons: React.FC<PropsType> = ({ user }) => {
  const { TextArea } = Input;

  const [diagnoses, setDiagnoses] = useState<Array<DirectoryEntity>>([]);
  const [procedures, setProcedures] = useState<Array<DirectoryEntity>>([]);
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(
    dayjs(new Date())
  );
  const [selectedTalon, setSelectedTalon] = useState<VisitObj | undefined>(
    undefined
  );
  const [talons, setTalons] = useState<Array<VisitObj>>([]);
  const [activeIndex, setActiveIndex] = useState<number>();
  const [diagnosisId, setDiagnosisId] = useState<number>();
  const [procedureId, setProcedureId] = useState<number>();
  const [recipe, setRecipe] = useState<string>("");

  const { showBoundary } = useErrorBoundary();

  moment.locale("ru");
  dayjs.locale("ru");

  useEffect(() => {
    const getDiagnoses = async () => {
      try {
        const response = await axios.get<Array<DirectoryEntity>>(
          "api/diagnoses"
        );
        if (response.status === 200) setDiagnoses(response.data);
        else console.log(response.statusText);
      } catch (error) {
        showBoundary(error);
      }
    };

    const getProcedures = async () => {
      try {
        const response = await axios.get<Array<DirectoryEntity>>(
          "api/procedures"
        );
        if (response.status === 200) setProcedures(response.data);
        else console.log(response.statusText);
      } catch (error) {
        showBoundary(error);
      }
    };

    getDiagnoses();
    getProcedures();
  }, [showBoundary]);

  useEffect(() => {
    const getTalons = async () => {
      try {
        const response = await axios.get<Array<VisitObj>>(
          `api/Visits/Talons?doctorId=${
            user?.doctorId
          }&date=${selectedDate.format("YYYY-MM-DD")}`
        );
        if (response.status === 200) setTalons(response.data);
        else console.log(response.statusText);
      } catch (error) {
        showBoundary(error);
      }
    };

    getTalons();
    setSelectedTalon(undefined);
    setActiveIndex(undefined);
  }, [selectedDate, user, showBoundary]);

  const onRowClick = (row: VisitObj) => {
    setSelectedTalon(row);
  };

  const completeVisit = async () => {
    try {
      const visit: VisitObj = {
        id: selectedTalon?.id,
        patientId: selectedTalon?.patientId,
        diagnosis: { id: diagnosisId ? diagnosisId : 0, name: "" },
        recipe: recipe,
        procedure: { id: procedureId ? procedureId : 0, name: "" },
        dateT: selectedTalon?.dateT,
        timeT: selectedTalon?.timeT,
        doctorId: selectedTalon?.doctorId,
        visitStatusId: 2,
      };

      const response = await axios.put(
        `api/visits/${selectedTalon?.id}`,
        visit
      );
      if (response.status === 201) {
        const getTalons = async () => {
          axios
            .get<Array<VisitObj>>(
              `api/Visits/Talons?doctorId=${
                user?.doctorId
              }&date=${selectedDate.format("YYYY-MM-DD")}`
            )
            .then((response) => setTalons(response.data))
            .catch((error) => showBoundary(error));
        };
        getTalons();
        notification.success({
          message: "Запись завершена",
          placement: "topRight",
          duration: 2,
        });
      } else {
        console.log(response.statusText);
        notification.error({
          message: "Ошибка",
          placement: "topRight",
          duration: 2,
        });
      }

      setSelectedTalon(undefined);
    } catch (error) {
      showBoundary(error);
    }
  };

  return (
    <React.Fragment>
      <br />
      <Label style={{ marginRight: "10px" }}>Выберите дату:</Label>
      <ConfigProvider locale={locale}>
        <DatePicker
          minDate={dayjs(new Date())}
          allowClear={false}
          format={"DD/MM/YYYY"}
          key="selectedDate"
          name="selectedDate"
          value={dayjs(selectedDate)}
          onChange={(date) => setSelectedDate(dayjs(date))}
          style={{ width: "150px" }}
        />
        <br />
      </ConfigProvider>
      <Table
        key="talonsTable"
        dataSource={talons}
        columns={columns}
        pagination={{ pageSize: 20 }}
        scroll={{ y: 500 }}
        size="small"
        rowClassName={(record, index) =>
          record.visitStatusId === 1
            ? "red"
            : index === activeIndex
            ? "gray"
            : ""
        }
        bordered
        className="div1"
        onRow={(record, rowIndex) => {
          return {
            onClick: (e) => {
              onRowClick(record);
              setActiveIndex(rowIndex);
            },
          };
        }}
      />
      <div className="div2">
        <div>
          <Label className="center">Информация о записи</Label>
          <br />
          <Label>Дата: {selectedTalon?.dateT}</Label>
          <br />
          <Label>Время: {selectedTalon?.timeT}</Label>
          <br />
          <Label>Врач: {selectedTalon?.doctorFullName}</Label>
          <br />
          <Label>Пациент: {selectedTalon?.patientFullName}</Label>
          <br />
          <Select
            key="selectDiagnosis"
            onChange={(value) => setDiagnosisId(value)}
            style={{ width: "50%", marginBottom: "10px" }}
            placeholder="Диагноз"
            optionFilterProp="children"
            showSearch
          >
            {diagnoses.map((v, k) => {
              return (
                <Select.Option value={v.id} key={k}>
                  {v.name}
                </Select.Option>
              );
            })}
          </Select>
          <br />
          <Select
            key="selectProcedure"
            onChange={(value) => setProcedureId(value)}
            style={{ width: "50%", marginBottom: "10px" }}
            placeholder="Процедура"
            optionFilterProp="children"
            showSearch
          >
            {procedures.map((v, k) => {
              return (
                <Select.Option value={v.id} key={k}>
                  {v.name}
                </Select.Option>
              );
            })}
          </Select>
          <br />
          <TextArea
            name="recipe"
            key="recipe"
            value={recipe}
            onChange={(e) => setRecipe(e.target.value)}
            rows={4}
            placeholder="Рецепт"
            style={{ marginBottom: "10px" }}
          />
          <br />
        </div>
        <div>
          <Button
            type="primary"
            key="completeVisit"
            onClick={() => completeVisit()}
            disabled={selectedTalon?.visitStatusId === 1 ? false : true}
          >
            Завершить запись
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DoctorsTalons;
