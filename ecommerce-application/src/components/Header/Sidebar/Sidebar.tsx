import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { NavLink } from 'react-router-dom';
import './Sidebar.scss';

export function Sidebar(props: {
  className: ({ isActive }: { isActive: boolean }) => string;
  userLoggedIn: boolean;
  logoutHandler: React.MouseEventHandler<HTMLAnchorElement>;
}): React.ReactElement {
  const { className, userLoggedIn, logoutHandler } = props;
  return (
    <nav>
      <Menu
        right
        disableCloseOnEsc
        customBurgerIcon={
          <img alt="burger_icon" src="src/assets/img/menu-1-svgrepo-com.png" />
        }
        customCrossIcon={
          <img alt="arrow" src="src/assets/img/arrow-right-1-svgrepo-com.png" />
        }
      >
        <NavLink className={`menu-item ${className}`} to="/">
          Main
        </NavLink>
        {!userLoggedIn && (
          <NavLink className={`menu-item ${className}`} to="/login">
            Login
          </NavLink>
        )}
        {!userLoggedIn && (
          <NavLink className={`menu-item ${className}`} to="/registration">
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
