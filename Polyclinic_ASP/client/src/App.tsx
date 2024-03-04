import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Doctor from './Components/Doctor/Doctor';
import Patient from './Components/Patient/Patient';
import 'bootstrap/dist/css/bootstrap.css';
import Layout from './Components/Layer/Layout';
import TalonsTable from './Components/TalonsTable/TalonsTable';
import Register from './Components/Auth/Register';
import Login from './Components/Auth/Login';
import { useState, useEffect } from 'react';
import UserObj from './Components/Entities/UserObj';
import Logout from './Components/Auth/Logout';

interface ResponseModel {
  message: string,
  responseUser: UserObj
} 

function App() {
  
  const [user, setUser] = useState<UserObj | null>(null);

  useEffect(() => {
    const getUser = async () =>
    {
      const requestOptions = {
        method: 'GET'
      }

      return await fetch('api/isauthenticated', requestOptions)
      .then((response) => {
        return response.json();
      })
      .then(
        (data : ResponseModel) => {
            console.log(data.responseUser);
            setUser(data.responseUser);
          }
        ,(error) => console.log(error)
      )
    }
    getUser();
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={(<><Layout user={user}/>
          {user ? `Вы авторизованы как ${user.username}` : 'Вы не авторизованы '}
        </>)}>
          <Route path='/register' element={<Register />}/>
          <Route path='/login' element={<Login setUser={setUser}/>}/>
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
          <Route path='/logout' element={<Logout setUser={setUser}/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>

    // Здесь будет элемент главной страницы с авторизацией
  );
}

export default App;
