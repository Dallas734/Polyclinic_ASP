import "./TalonsTable.css";
import VisitObj from "../Entities/VisitObj";
import type { TableProps } from "antd";
import { Table, Select, Input, Button, DatePicker } from 'antd';
import { Label } from "reactstrap";
import React, {useState, useEffect} from 'react';
import UserObj from "../Entities/UserObj";
import DirectoryEntity from "../Entities/DirectoryEntity";
import { ConfigProvider } from 'antd/lib';
import moment from "moment";
import locale from 'antd/locale/ru_RU';
import dayjs from "dayjs";
import 'dayjs/locale/ru';
import 'moment/locale/ru';

interface PropsType {
    user: UserObj | null
}

const columns: TableProps<VisitObj>['columns'] = [
    {title: 'Время', dataIndex: 'timeT', key: 'timeT'},
    {title: 'Статус', dataIndex: 'visitStatusName', key: 'visitStatusName'}
];

const DoctorsTalons: React.FC<PropsType> = ({user}) => {

    const { TextArea } = Input;

    const [diagnoses, setDiagnoses] = useState<Array<DirectoryEntity>>([]);
    const [procedures, setProcedures] = useState<Array<DirectoryEntity>>([]);
    const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(dayjs(new Date()));
    const [selectedTalon, setSelectedTalon] = useState<VisitObj | undefined>(undefined);
    const [talons, setTalons] = useState<Array<VisitObj>>([]);
    const [activeIndex, setActiveIndex] = useState<number>();
    const [diagnosisId, setDiagnosisId] = useState<number>();
    const [procedureId, setProcedureId] = useState<number>();
    const [recipe, setRecipe] = useState<string>("");

    moment.locale('ru');
    dayjs.locale('ru');

    useEffect(() => {
        fetch('api/diagnoses', {method: 'GET'})
        .then(response => response.json())
        .then((data: Array<DirectoryEntity>) => setDiagnoses(data));

        fetch('api/procedures', {method: 'GET'})
        .then(response => response.json())
        .then((data: Array<DirectoryEntity>) => setProcedures(data));
    }, [])

    useEffect(() => {
        console.log(selectedDate);
        fetch(`api/Visits/Talons?doctorId=${user?.doctorId}&date=${selectedDate.format('YYYY-MM-DD')}`, {method: 'GET'})
        .then(response => response.json())
        .then((data: Array<VisitObj>) => setTalons(data));

        setSelectedTalon(undefined);
        setActiveIndex(undefined);
    }, [selectedDate, user])

    const onRowClick = (row: VisitObj) => {
        setSelectedTalon(row);
    }

    const completeVisit = async () => {
        const visit: VisitObj = {
            id: selectedTalon?.id,
            patientId: selectedTalon?.patientId,
            diagnosis: {id: diagnosisId ? diagnosisId : 0, name: ""},
            recipe: recipe,
            procedure: {id: procedureId? procedureId : 0, name: ""},
            dateT: selectedTalon?.dateT,
            timeT: selectedTalon?.timeT,
            doctorId: selectedTalon?.doctorId,
            visitStatusId: 2
        }

        console.log(visit);

        const requestOptions: RequestInit = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(visit)
        }

        const response = await fetch(`api/visits/${selectedTalon?.id}`, requestOptions);
            response.json()
                .then(data => {
                    if (response.ok) 
                    {
                        const getTalons = async () => {
                            await fetch(`api/Visits/Talons?doctorId=${user?.doctorId}&date=${selectedDate.format('YYYY-MM-DD')}`, {method: 'GET'})
                            .then(response => response.json())
                            .then((data: Array<VisitObj>) => setTalons(data));
                        }
                        getTalons();
                    };
                }, error => console.log(error));
        
        setSelectedTalon(undefined);
    }

    return (
    <React.Fragment>
        <br/>
        <Label style={{marginRight: '10px'}}>Выберите дату:</Label>
        <ConfigProvider locale={locale}>
            <DatePicker minDate={dayjs(new Date())} allowClear={false} format={'DD/MM/YYYY'} key="selectedDate" name="selectedDate" value={dayjs(selectedDate)} onChange={(date) => setSelectedDate(dayjs(date))} style={{width: '150px'}}/><br/>    
        </ConfigProvider>          
        <Table key="talonsTable" dataSource={talons} columns={columns} pagination={{ pageSize: 20}} scroll={{ y: 500}} size='small'
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
                <Label>Пациент: {selectedTalon?.patientFullName}</Label><br/>
                <Select key="selectDiagnosis" onChange={value => setDiagnosisId(value)} style={{width: '50%', marginBottom: '10px'}} placeholder="Диагноз"
                    optionFilterProp="children" showSearch>
                    {
                        diagnoses.map((v, k) => {
                            return <Select.Option value={v.id} key={k}>{v.name}</Select.Option>
                        })
                    }
                </Select><br/>
                <Select key="selectProcedure" onChange={value => setProcedureId(value)} style={{width: '50%', marginBottom: '10px'}} placeholder="Процедура"
                    optionFilterProp="children" showSearch>
                    {
                        procedures.map((v, k) => {
                            return <Select.Option value={v.id} key={k}>{v.name}</Select.Option>
                        })
                    }
                </Select><br/>
                <TextArea name="recipe" key="recipe" value={recipe} onChange={e => setRecipe(e.target.value)} rows={4} placeholder="Рецепт" style={{marginBottom: '10px'}}/><br/>
            </div>
            <div>
                <Button type="primary" key="completeVisit" onClick={() => completeVisit()} disabled={selectedTalon?.visitStatusId === 1? false : true}>Завершить запись</Button>
            </div>
        </div>
    </React.Fragment>
    );
}

export default DoctorsTalons;