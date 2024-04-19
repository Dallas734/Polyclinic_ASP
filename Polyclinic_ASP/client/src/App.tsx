import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Doctor from "./Components/Doctor/Doctor";
import Patient from "./Components/Patient/Patient";
import "bootstrap/dist/css/bootstrap.css";
import Layout from "./Components/Layer/Layout";
import TalonsTable from "./Components/TalonsTable/TalonsTable";
import DoctorsTalons from "./Components/TalonsTable/DoctorsTalons";
import Register from "./Components/Auth/Register";
import Login from "./Components/Auth/Login";
import { useState, useEffect } from "react";
import UserObj from "./Components/Entities/UserObj";
import Logout from "./Components/Auth/Logout";
import PatientCard from "./Components/Patient/PatientCard";
import Shedule from "./Components/Shedule/Shedule";
import { Fetch } from "./axiosInstance";
import { Helmet } from "react-helmet";

function App() {
  const [user, setUser] = useState<UserObj | null>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await Fetch.get<UserObj>(`api/isauthenticated`);
        if (data !== null) {
          console.log(data);
          setUser(data);
        }
      } catch (error) {}
    };
    getUser();
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>МИС</title>
      </Helmet>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout user={user} />}>
            <Route
              index
              element={<h3>Медицинская информационная система (МИС)</h3>}
            />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route
              path="/doctors"
              element={
                <div>
                  <Doctor />
                </div>
              }
            />
            <Route
              path="/patients"
              element={
                <div>
                  <Patient />
                </div>
              }
            />
            <Route
              path="/addVisits"
              element={
                <div>
                  <TalonsTable />
                </div>
              }
            />
            <Route
              path="/patientsCard"
              element={
                <div>
                  <PatientCard />
                </div>
              }
            />
            <Route
              path="/doctorsTalons"
              element={
                <div>
                  <DoctorsTalons user={user} />
                </div>
              }
            />
            <Route
              path="/shedule"
              element={
                <div>
                  <Shedule />
                </div>
              }
            />
            <Route
              path="/logout"
              element={<Logout setUser={setUser} />}
            ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
