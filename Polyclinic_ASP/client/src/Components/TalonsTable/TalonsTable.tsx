import React, {useState, useEffect} from "react";
import { Table, Select, Button, DatePicker } from 'antd';
import DirectoryEntity from "../Entities/DirectoryEntity";
import type { TableProps } from "antd";
import VisitObj from "../Entities/VisitObj";
import DoctorObj from "../Entities/DoctorObj";
import PatientObj from "../Entities/PatientObj";
import "./TalonsTable.css";
import { Label } from "reactstrap";
import dayjs from "dayjs";
import moment from "moment";
import locale from 'antd/lib/locale/ru_RU';
import 'dayjs/locale/ru';
import { ConfigProvider } from "antd/lib";
import 'moment/locale/ru';
import { notification } from "antd";

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
    const [selectedTalon, setSelectedTalon] = useState<VisitObj | undefined>(undefined);
    const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(dayjs(new Date()));
    const [activeIndex, setActiveIndex] = useState<number>();
    //const [tableEvents, setTableEvents] = useState<Array<TableEvent>>([]);

    moment.locale('ru');
    //const localaizer = momentLocalizer(moment);

    const addTalon = (visit: VisitObj) => setTalons(talons.map(o => {
        if (o.timeT === visit.timeT)
        {
            return visit;
        }
        return o;
    }));

    const removeTalon = (removeId: number | undefined) => {
        setTalons(talons.map(o => {
            if (o.id === removeId)
            {
                const newVisit:  VisitObj = {
                    timeT: talons.find(({id}) => id === o.id)?.timeT,
                    dateT: talons.find(({id}) => id === o.id)?.dateT
                }
                setSelectedTalon(newVisit);
                return newVisit;
            }
            return o;
        }));
    };

    //const previousValues = useRef({areaId, specId});

    useEffect(() => {
        fetch('api/Areas', {method: 'GET'})
        .then(response => response.json())
        .then((data: Array<DirectoryEntity>) => setAreas(data));

        fetch('api/Specializations', {method: 'GET'})
        .then(response => response.json())
        .then((data: Array<DirectoryEntity>) => setSpecs(data));
    }, [])

    useEffect(() => {
        setDoctorId(undefined);
        fetch(`api/Doctors/byAreaAndSpec?areaId=${areaId}&specId=${specId}`)
        .then(response => response.json())
        .then((data: Array<DoctorObj>) => setDoctors(data));

        setSelectedTalon(undefined);
        setActiveIndex(undefined);
    }, [areaId, specId])

    useEffect(() => {
        fetch(`api/Patients/byArea?areaId=${areaId}`)
        .then(response => response.json())
        .then((data: Array<PatientObj>) => setPatients(data));

        setSelectedTalon(undefined);
        setActiveIndex(undefined);
    }, [areaId])

    useEffect(() => {
        fetch(`api/Visits/Talons?doctorId=${doctorId}&date=${selectedDate.format('YYYY-MM-DD')}`, {method: 'GET'})
        .then(response => response.json())
        .then((data: Array<VisitObj>) => setTalons(data));

        setSelectedTalon(undefined);
        setActiveIndex(undefined);
    }, [doctorId, selectedDate])

    const columns: TableProps<VisitObj>['columns'] = [
        {title: 'Время', dataIndex: 'timeT', key: 'timeT'},
        {title: 'Статус', dataIndex: 'visitStatusName', key: 'visitStatusName'}
    ];

    const onRowClick = (row: VisitObj) => {
        setSelectedTalon(row);
    }

    const addVisit = async () => {
        const visit: VisitObj = {
            doctorId,
            patientId,
            dateT: selectedDate.format('YYYY-MM-DD'),
            timeT: selectedTalon?.timeT,
        }

        const requestOptions: RequestInit = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(visit)
        }

        return await fetch(`api/Visits`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    setSelectedTalon(data);
                    addTalon(data);
                    notification.success({
                        message: "Запись добавлена",
                        placement: 'topRight',
                        duration: 2
                    });
                }, error => console.log(error));
    }

    const deleteVisit = async () => {
        const requestOptions : RequestInit = {
            method: 'DELETE',
            headers: undefined,
            body: undefined
        }

        return await fetch(`api/Visits/${selectedTalon?.id}`, requestOptions)
            .then(response => {
                if (response.ok) 
                {
                    notification.success({
                        message: "Запись удалена",
                        placement: 'topRight',
                        duration: 2
                    });
                    removeTalon(selectedTalon?.id);
                }
            }, error => console.log(error));
    }

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
        <ConfigProvider locale={locale}>
            <DatePicker minDate={dayjs(new Date())} allowClear={false} format={'DD/MM/YYYY'} key="selectedDate" name="selectedDate" value={dayjs(selectedDate)} onChange={(data) => setSelectedDate(dayjs(data))} style={{width: '150px'}}/><br/>  
        </ConfigProvider>            
        <Table key="talonsTable" dataSource={talons} columns={columns} pagination={{ pageSize: 20}} scroll={{ y: 400}} size='small'
            rowClassName={(record, index) => (record.visitStatusId === 1 ? "red" : index === activeIndex ? "gray" : "")} bordered
            className="div1" 
            onRow = {(record, rowIndex) => {
                return {
                    onClick: (e) => {
                        onRowClick(record);
                        setActiveIndex(rowIndex);
                    }
                }
            }}/>
        <div className="div2">
            <div>
                <Label className="center">Информация о записи</Label><br/>
                <Label>Дата: {selectedTalon?.dateT}</Label><br/>
                <Label>Время: {selectedTalon?.timeT}</Label><br/>
                <Label>Врач: {selectedTalon?.doctorFullName}</Label><br/>
                <Label>Пациент: {selectedTalon?.patientFullName}</Label>
            </div>
            <div>
                <Button type="primary" key="addVisit" onClick={() => addVisit()} disabled={selectedTalon && patientId && doctorId && selectedTalon?.visitStatusId !== 1? false : true}>Записать</Button>
                <Button type="primary" className="button" key="deleteVisit" onClick={() => deleteVisit()}danger disabled={selectedTalon?.visitStatusId === 1 ? false : true}>Удалить</Button>
            </div>
        </div>
    </React.Fragment>);
}
export default TalonsTable;