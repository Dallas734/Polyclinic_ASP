import React from "react";
import {Outlet} from "react-router-dom";
import {Navbar, NavbarBrand, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

const Layout: React.FC = () => {
    return (
    <>
    <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
        <NavbarBrand tag={Link} to="/">Поликлиника</NavbarBrand>
            <ul className="navbar-nav flex-grow">
                <NavItem>
                    <NavLink tag={Link} to='/'>Главная</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} to='/doctors'>Доктора</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} to='/patients'>Пациенты</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} to='/addVisits'>Записать пациента</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} to='/logoff'>Выход</NavLink>
                </NavItem>
            </ul>
    </Navbar>
    <Outlet />
    </>
    );
}
export default Layout;