import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Doctor from './Components/Doctor/Doctor';
import Patient from './Components/Patient/Patient';
import 'bootstrap/dist/css/bootstrap.css';
import Layout from './Components/Layer/Layout';
import TalonsTable from './Components/TalonsTable/TalonsTable';
import Register from './Components/Auth/Register';
import Login from './Components/Auth/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/' element={<Layout />}>
          <Route path='/doctors' element={
            <div>
              <Doctor />
            </div>
          }/>
          <Route path='/patients' element={
            <div>
              <Patient />
            </div>
          }/>
          <Route path='/addVisits' element={
            <div>
              <TalonsTable />
            </div>
          }/>
        </Route>
      </Routes>
    </BrowserRouter>

    // Здесь будет элемент главной страницы с авторизацией
  );
}

export default App;
