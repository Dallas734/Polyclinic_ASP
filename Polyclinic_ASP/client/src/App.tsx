import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Doctor from './Components/Doctor/Doctor';
import Patient from './Components/Patient/Patient';
import 'bootstrap/dist/css/bootstrap.css';
import Layout from './Components/Layer/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
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
          <Route path='/addVisits'/>
        </Route>
      </Routes>
    </BrowserRouter>

    // Здесь будет элемент главной страницы с авторизацией
  );
}

export default App;
