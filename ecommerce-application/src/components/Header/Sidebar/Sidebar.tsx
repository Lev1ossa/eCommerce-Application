import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { NavLink } from 'react-router-dom';
import './Sidebar.scss';

// eslint-disable-next-line max-lines-per-function
export function Sidebar(props: {
  className: ({ isActive }: { isActive: boolean }) => string;
  userLoggedIn: boolean;
  logoutHandler: () => Promise<void>;
}): React.ReactElement {
  const { className, userLoggedIn, logoutHandler } = props;
  const burgerIconUrl = new URL(
    '../../../assets/img/burger-menu.png',
    import.meta.url,
  ).href;
  const burgerArrowUrl = new URL(
    '../../../assets/img/burger-arrow.png',
    import.meta.url,
  ).href;

  return (
    <nav>
      <Menu
        styles={{ bmCrossButton: { width: '40px', height: '40px' } }}
        right
        disableCloseOnEsc
        customBurgerIcon={<img alt="burger_icon" src={burgerIconUrl} />}
        customCrossIcon={<img alt="arrow" src={burgerArrowUrl} />}
      >
        <NavLink className={`menu-item ${className}`} to="/">
          Main
        </NavLink>
        <NavLink className={`menu-item ${className}`} to="/catalog">
          Catalog
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
        <NavLink className={`menu-item ${className}`} to="/cart">
          Cart
        </NavLink>
        {userLoggedIn && (
          <NavLink className={`menu-item ${className}`} to="/profile">
            Profile
          </NavLink>
        )}
        {userLoggedIn && (
          <button
            className="logout_button"
            onClick={logoutHandler}
            type="button"
          >
            Logout
          </button>
        )}
      </Menu>
    </nav>
  );
}
