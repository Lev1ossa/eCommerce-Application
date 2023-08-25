import React from 'react';
import { stack as Menu } from 'react-burger-menu';
import { NavLink } from 'react-router-dom';
import './Sidebar.scss';

export default function Sidebar(props: {
  userLoggedIn: boolean;
  logoutHandler: React.MouseEventHandler<HTMLAnchorElement>;
}): React.ReactElement {
  const { userLoggedIn, logoutHandler } = props;
  return (
    <nav>
      <Menu right disableCloseOnEsc>
        <NavLink className="menu-item" to="/">
          Main
        </NavLink>
        {!userLoggedIn && (
          <NavLink className="menu-item" to="/login">
            Login
          </NavLink>
        )}
        {!userLoggedIn && (
          <NavLink className="menu-item" to="/registration">
            Registration
          </NavLink>
        )}
        {userLoggedIn && (
          <NavLink onClick={logoutHandler} to="#">
            Logout
          </NavLink>
        )}
      </Menu>
    </nav>
  );
}
