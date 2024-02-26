import React, {useState, useEffect} from "react";
import { Table, Select, Input } from 'antd';
import DirectoryEntity from "../Entities/DirectoryEntity";
import type { TableProps } from "antd";
import VisitObj from "../Entities/VisitObj";
import DoctorObj from "../Entities/DoctorObj";
import PatientObj from "../Entities/PatientObj";
import "./TalonsTable.css";

interface PropsType {

}

const TalonsTable: React.FC<PropsType> = () => {

    const [areas, setAreas] = useState<Array<DirectoryEntity>>([]);
    const [doctors, setDoctors] = useState<Array<DoctorObj>>([]);
    const [patients, setPatients] = useState<Array<PatientObj>>([]);
    const [specs, setSpecs] = useState<Array<DirectoryEntity>>([]);
    const [areaId, setAreaId] = useState<number | undefined>(undefined);
    const [specId, setSpecId] = useState<number | undefined>(undefined);
    const [doctorId, setDoctorId] = useState<number | undefined>(undefined);
    const [patientId, setPatientId] = useState<number | undefined>(undefined);
    const [talons, setTalons] = useState<Array<VisitObj>>([]);
    const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);

    //const previousValues = useRef({areaId, specId});

    useEffect(() => {
        fetch('api/Area', {method: 'GET'})
        .then(response => response.json())
        .then((data: Array<DirectoryEntity>) => setAreas(data));

        fetch('api/Specialization', {method: 'GET'})
        .then(response => response.json())
        .then((data: Array<DirectoryEntity>) => setSpecs(data));
    }, [])

    useEffect(() => {
        setDoctorId(undefined);
        fetch(`api/Doctor/byAreaAndSpec?areaId=${areaId}&specId=${specId}`)
        .then(response => response.json())
        .then((data: Array<DoctorObj>) => setDoctors(data));
    }, [areaId, specId])

    useEffect(() => {
        fetch(`api/Patient/byArea?areaId=${areaId}`)
        .then(response => response.json())
        .then((data: Array<PatientObj>) => setPatients(data));
    }, [areaId])

    useEffect(() => {
        fetch(`api/Visit/Talons?doctorId=${doctorId}&date=${selectedDate}`, {method: 'GET'})
        .then(response => response.json())
        .then((data: Array<VisitObj>) => setTalons(data));
    }, [doctorId, selectedDate])

    const columns: TableProps<VisitObj>['columns'] = [
        {title: 'Время', dataIndex: 'timeT', key: 'timeT'},
        {title: 'Статус', dataIndex: 'visitStatusName', key: 'visitStatusName'}
    ];

    return (
    <React.Fragment>
        <div>
            <h3>Запись пациента</h3>
        </div><br/>
        <div>
            <ul>
                <li>
                    <label>Участок</label>
                    <Select key="selectArea" value={areaId} onChange={value => setAreaId(value)} style={{width: '150px'}}>
                        {areas.map((a, k) => {
                            return <Select.Option value={a.id} key={k}>{a.name}</Select.Option>
                        })}
                    </Select>
                </li>
                <li>
                    <label>Специальность</label>
                    <Select key="selectSpec" value={specId} onChange={value => setSpecId(value)} style={{width: '150px'}}
                        optionFilterProp="children" showSearch>
                        {specs.map((s, k) => {
                            return <Select.Option value={s.id} key={k}>{s.name}</Select.Option>
                        })}
                    </Select>
                </li>
                <li>
                    <label>Врач</label>
                    <Select key="selectDoctor" value={doctorId} onChange={value => setDoctorId(value)} style={{width: '300px'}}
                        optionFilterProp="children" showSearch>
                        {doctors.map((d, k) => {
                            return <Select.Option value={d.id} key={k}>{d.fullName}</Select.Option>
                        })}
                    </Select>
                </li>
                <li>
                    <label>Пациент</label>
                    <Select key="selectPatient" value={patientId} onChange={value => setPatientId(value)} style={{width: '300px'}}
                        optionFilterProp="children" showSearch>
                        {patients.map((p, k) => {
                            return <Select.Option value={p.id} key={k}>{p.fullName}</Select.Option>
                        })}
                    </Select>
                </li>
            </ul>
        </div><br/>
        <Input key="selectedDate" type="date" name="selectedDate" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} style={{width: '150px'}}/><br/>                
        <Table key="talonsTable" dataSource={talons} columns={columns} pagination={{ pageSize: 20}} scroll={{ y: 400}} size='small'
            rowClassName={(record) => (record.visitStatusId === 1 ? "red" : "")} bordered />
    </React.Fragment>);
}
export default TalonsTable;