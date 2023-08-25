import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { NavLink } from 'react-router-dom';
import './Sidebar.scss';

export default function Sidebar(): React.ReactElement {
  return (
    <Menu right>
      <NavLink className="menu-item" to="/">
        Main
      </NavLink>
      <NavLink className="menu-item" to="/login">
        Login
      </NavLink>
      <NavLink className="menu-item" to="/registration">
        Registration
      </NavLink>
    </Menu>
  );
}
