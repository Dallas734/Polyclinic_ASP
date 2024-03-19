import React, { useState, useEffect } from "react";
import DoctorObj from "../Entities/DoctorObj";
import DirectoryEntity from "../Entities/DirectoryEntity";
import { Button, Select, TimePicker } from "antd";
import { Label } from "reactstrap";
import SheduleObj from "../Entities/SheduleObj";
import dayjs from "dayjs";
import axios from "axios";
import "./Shedule.css";
import { notification } from "antd";
import { useErrorBoundary } from "react-error-boundary";

interface PropsType {}

const Shedule: React.FC<PropsType> = () => {
  const [areas, setAreas] = useState<Array<DirectoryEntity>>([]);
  const [doctors, setDoctors] = useState<Array<DoctorObj>>([]);
  const [specs, setSpec] = useState<Array<DirectoryEntity>>([]);
  const [shedules, setShedules] = useState<Array<SheduleObj>>([]);
  const [specId, setSpecId] = useState<number>();
  const [areaId, setAreaId] = useState<number>();
  const [doctorId, setDoctorId] = useState<number>();

  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    fetch(`api/areas`, { method: "GET" })
      .then((response) => response.json())
      .then((data) => setAreas(data))
      .catch((error) => showBoundary(error));

    fetch(`api/specializations`, { method: "GET" })
      .then((response) => response.json())
      .then((data) => setSpec(data))
      .catch((error) => showBoundary(error));
  }, [showBoundary]);

  useEffect(() => {
    fetch(`api/doctors/byAreaAndSpec?areaId=${areaId}&specId=${specId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setDoctors(data))
      .catch((error) => showBoundary(error));

    setDoctorId(undefined);
  }, [areaId, specId, showBoundary]);

  useEffect(() => {
    fetch(`api/shedules?doctorId=${doctorId}`, { method: "GET" })
      .then((response) => response.json())
      .then((data) => setShedules(data))
      .catch((error) => showBoundary(error));
  }, [doctorId, showBoundary]);

  const handleSubmitSheduleBtn = async () => {
    // const requestOptions = {
    //     method: 'PUT',
    //     headers: {'Content-Type': 'application/json'},
    //     body: JSON.stringify(shedules)
    // }

    await axios.put(`api/shedules`, shedules);

    notification.success({
      message: "Обновление завершилось удачно",
      placement: "topRight",
      duration: 2,
    });

    await fetch(`api/doctors/byAreaAndSpec?areaId=${areaId}&specId=${specId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setDoctors(data))
      .catch((error) => showBoundary(error));
  };
  return (
    <React.Fragment>
      <div>
        <h3>Расписание врача</h3>
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
            <label>Специальность</label>
            <Select
              key="selectSpec"
              value={specId}
              onChange={(value) => setSpecId(value)}
              style={{ width: "150px" }}
              optionFilterProp="children"
              showSearch
            >
              {specs.map((s, k) => {
                return (
                  <Select.Option value={s.id} key={k}>
                    {s.name}
                  </Select.Option>
                );
              })}
            </Select>
          </li>
          <li>
            <label>Врач</label>
            <Select
              key="selectDoctor"
              value={doctorId}
              onChange={(value) => setDoctorId(value)}
              style={{ width: "300px" }}
              optionFilterProp="children"
              showSearch
            >
              {doctors.map((d, k) => {
                return (
                  <Select.Option value={d.id} key={k}>
                    {d.fullName}
                  </Select.Option>
                );
              })}
            </Select>
          </li>
        </ul>
      </div>
      <br />
      <table>
        <thead>
          <tr>
            <th>День недели</th>
            <th>Начало</th>
            <th>Конец</th>
          </tr>
        </thead>
        <tbody>
          {shedules.map((s: SheduleObj, k) => (
            <tr>
              <td>
                <Label key="label">{s.day.name}</Label>
              </td>
              <td>
                <TimePicker
                  key="beginTime"
                  inputReadOnly={true}
                  defaultValue={dayjs(s.beginTime, "HH:mm:ss")}
                  minuteStep={30}
                  format="HH:mm"
                  onChange={(e) =>
                    (s.beginTime = dayjs(e, "HH:mm:ss").format("HH:mm:ss"))
                  }
                />
              </td>
              <td>
                <TimePicker
                  key="beginTime"
                  inputReadOnly={true}
                  defaultValue={dayjs(s.endTime, "HH:mm:ss")}
                  minuteStep={30}
                  format="HH:mm"
                  onChange={(e) =>
                    (s.endTime = dayjs(e, "HH:mm:ss").format("HH:mm:ss"))
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <Button
        onClick={() => handleSubmitSheduleBtn()}
        type="primary"
        disabled={doctorId ? false : true}
      >
        Сохранить
      </Button>
    </React.Fragment>
  );
};
export default Shedule;
