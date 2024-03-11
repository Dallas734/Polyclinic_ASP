import React from "react";
import {Outlet} from "react-router-dom";
import {Navbar, NavbarBrand, NavItem, NavLink, Nav, DropdownMenu, DropdownToggle, UncontrolledDropdown, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import UserObj from "../Entities/UserObj";

interface PropsType {
    user: UserObj | null
}

const Layout: React.FC<PropsType> = ({ user }) => {
    return (
    <>
    <Navbar className="navbar navbar-expand-lg bg-dark navbar-dark" container>
        <NavbarBrand tag={Link} to="/">МИС</NavbarBrand>
            <Nav className="me-auto" navbar>
                {user?.roles.includes("Registrator") ? (
                    <>
                    <NavItem>
                        <NavLink tag={Link} to='/doctors'>Доктора</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to='/patients'>Пациенты</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to='/addVisits'>Записать пациента</NavLink>
                    </NavItem>
                    </>
                ) : user?.roles.includes("Doctor") ? (
                    <>
                    <NavItem>
                        <NavLink tag={Link} to='/patientsCard'>Медкарта</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to='/doctorsTalons'>Принять пациента</NavLink>
                    </NavItem>
                    </>
                ) : null }
            </Nav>
            <UncontrolledDropdown nav>
                <DropdownToggle caret color="dark">
                    Аккаунт
                </DropdownToggle>
                <DropdownMenu dark>
                    <DropdownItem text>{user ? user.email : 'Не авторизован'}</DropdownItem>
                    <DropdownItem tag={Link} to='/register' disabled={user ? true : false}>Регистрация</DropdownItem>
                    <DropdownItem tag={Link} to='/login' disabled={user ? true : false}>Вход</DropdownItem>
                    <DropdownItem tag={Link} to='/logout' disabled={user ? false : true}>Выход</DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        </Navbar>
    <Outlet />
    </>
    );
}
export default Layout;