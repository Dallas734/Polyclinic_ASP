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
    const getAreas = async () => {
      try {
        const response = await axios.get<Array<DirectoryEntity>>(`api/areas`);
        if (response.status === 200) setAreas(response.data);
        else console.log(response.statusText);
      } catch (error) {
        showBoundary(error);
      }
    };

    const getSpecs = async () => {
      try {
        const response = await axios.get<Array<DirectoryEntity>>(
          `api/specializations`
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
    const getDoctorByAreaAndSpec = async () => {
      try {
        const response = await axios.get<Array<DoctorObj>>(
          `api/doctors/byAreaAndSpec?areaId=${areaId}&specId=${specId}`
        );
        if (response.status === 200) setDoctors(response.data);
        else console.log(response.statusText);
      } catch (error) {
        showBoundary(error);
      }
    };

    getDoctorByAreaAndSpec();
    setDoctorId(undefined);
  }, [areaId, specId, showBoundary]);

  useEffect(() => {
    const getSheduleDoctor = async () => {
      try {
        const response = await axios.get<Array<SheduleObj>>(
          `api/shedules?doctorId=${doctorId}`
        );
        if (response.status === 200) setShedules(response.data);
        else console.log(response.statusText);
      } catch (error) {
        showBoundary(error);
      }
    };

    getSheduleDoctor();
  }, [doctorId, showBoundary]);

  const handleSubmitSheduleBtn = async () => {
    const response = await axios.put(`api/shedules`, shedules);

    if (response.status === 200) {
      notification.success({
        message: "Обновление завершилось удачно",
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
