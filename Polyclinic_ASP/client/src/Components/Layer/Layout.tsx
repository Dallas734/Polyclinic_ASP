import React from "react";
import {Outlet} from "react-router-dom";
import {Navbar, NavbarBrand, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import UserObj from "../Entities/UserObj";

interface PropsType {
    user: UserObj | null
}

const Layout: React.FC<PropsType> = ({ user }) => {
    return (
    <>
    <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
        <NavbarBrand tag={Link} to="/">Поликлиника</NavbarBrand>
            <ul className="navbar-nav flex-grow">
                <NavItem>
                    <NavLink tag={Link} to='/'>Главная</NavLink>
                </NavItem>
                { user === null ? (
                    <>
                    <NavItem>
                        <NavLink tag={Link} to='/register'>Регистрация</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to='/login'>Вход</NavLink>
                    </NavItem>
                    </>
                ) : null }
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
                ) : null }
                { user !== undefined ? (
                <NavItem>
                    <NavLink tag={Link} to='/logout'>Выход</NavLink>
                </NavItem>
                ) : null}
            </ul>
    </Navbar>
    <Outlet />
    </>
    );
}
export default Layout;