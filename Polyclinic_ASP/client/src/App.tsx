import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Doctor from './Components/Doctor/Doctor';
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
          <Route path='/addVisits'/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
