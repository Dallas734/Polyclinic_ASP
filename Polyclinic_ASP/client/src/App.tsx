import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Doctor from './Components/Doctor/Doctor';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/doctors' element={
          <div>
            <Doctor />
          </div>
          }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
