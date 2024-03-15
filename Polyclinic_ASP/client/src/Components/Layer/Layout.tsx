import React from "react";
import { Outlet } from "react-router-dom";
import {
  NavLink,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  DropdownItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import UserObj from "../Entities/UserObj";
import { Layout as LayoutAntd, Menu } from "antd";
import "./Layout.css";

const { Header, Content, Footer } = LayoutAntd;

const defaultItems = [
  {
    label: (
      <NavLink tag={Link} to="/">
        МИС
      </NavLink>
    ),
    key: "1",
  },
];

const registratorItems = [
  {
    label: (
      <NavLink tag={Link} to="/">
        МИС
      </NavLink>
    ),
    key: "1",
  },
  {
    label: (
      <NavLink tag={Link} to="/doctors">
        Доктора
      </NavLink>
    ),
    key: "2",
  },
  {
    label: (
      <NavLink tag={Link} to="/shedule">
        Расписание
      </NavLink>
    ),
    key: "3",
  },
  {
    label: (
      <NavLink tag={Link} to="/patients">
        Пациенты
      </NavLink>
    ),
    key: "4",
  },
  {
    label: (
      <NavLink tag={Link} to="/addVisits">
        Записать пациента
      </NavLink>
    ),
    key: "5",
  },
];

const doctorItems = [
  {
    label: (
      <NavLink tag={Link} to="/">
        МИС
      </NavLink>
    ),
    key: "1",
  },
  {
    label: (
      <NavLink tag={Link} to="/patientsCard">
        Медкарта
      </NavLink>
    ),
    key: "2",
  },
  {
    label: (
      <NavLink tag={Link} to="/doctorsTalons">
        Принять пациента
      </NavLink>
    ),
    key: "3",
  },
];

interface PropsType {
  user: UserObj | null;
}

const Layout: React.FC<PropsType> = ({ user }) => {
  return (
    <LayoutAntd className="layout">
      <Header
        style={{
          display: "flex",
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
        }}
      >
        <Menu
          theme="dark"
          mode="horizontal"
          style={{ minWidth: "800px" }}
          items={
            user?.roles.includes("Registrator")
              ? registratorItems
              : user?.roles.includes("Doctor")
              ? doctorItems
              : defaultItems
          }
        ></Menu>
        <div style={{ marginLeft: "auto" }}>
          <UncontrolledDropdown>
            <DropdownToggle caret color="dark" right>
              Аккаунт
            </DropdownToggle>
            <DropdownMenu dark right>
              <DropdownItem text>
                {user ? user.email : "Не авторизован"}
              </DropdownItem>
              <DropdownItem
                tag={Link}
                to="/register"
                disabled={user ? true : false}
              >
                Регистрация
              </DropdownItem>
              <DropdownItem
                tag={Link}
                to="/login"
                disabled={user ? true : false}
              >
                Вход
              </DropdownItem>
              <DropdownItem
                tag={Link}
                to="/logout"
                disabled={user ? false : true}
              >
                Выход
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      </Header>
      <Content className="site-layout" style={{ minHeight: "100%" }}>
        <Outlet />
      </Content>
      <Footer style={{ textAlign: "center" }}>МИС ©️2024</Footer>
    </LayoutAntd>
  );
};
export default Layout;
