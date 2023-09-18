import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { NavLink } from 'react-router-dom';
import './Sidebar.scss';
import {
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineLogout,
  AiOutlineUser,
  AiOutlineUserAdd,
} from 'react-icons/ai';
import { LuApple } from 'react-icons/lu';
import { RiTeamLine } from 'react-icons/ri';
import { BsCart3 } from 'react-icons/bs';

// eslint-disable-next-line max-lines-per-function
export function Sidebar(props: {
  className: ({ isActive }: { isActive: boolean }) => string;
  userLoggedIn: boolean;
  logoutHandler: () => Promise<void>;
  quantityProducts: number | undefined;
}): React.ReactElement {
  const { className, userLoggedIn, logoutHandler, quantityProducts } = props;
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
          <AiOutlineHome className="icon" /> Main
        </NavLink>
        <NavLink className={`menu-item ${className}`} to="/catalog">
          <LuApple className="icon" />
          Catalog
        </NavLink>
        <li>
          <NavLink className={`menu-item ${className}`} to="/about_us">
            <RiTeamLine className="icon" />
            About Us
          </NavLink>
        </li>
        {!userLoggedIn && (
          <NavLink className={`menu-item ${className}`} to="/login">
            <AiOutlineLogin className="icon" />
            Login
          </NavLink>
        )}
        {!userLoggedIn && (
          <NavLink className={`menu-item ${className}`} to="/registration">
            <AiOutlineUserAdd className="icon" />
            Registration
          </NavLink>
        )}
        <NavLink className={`menu-item ${className}`} to="/cart">
          <div className="icon_container">
            <BsCart3 className="icon" />
            {quantityProducts && quantityProducts > 0 && (
              <span className="count_label">{quantityProducts}</span>
            )}
          </div>
          Cart
        </NavLink>
        {userLoggedIn && (
          <NavLink className={`menu-item ${className}`} to="/profile">
            <AiOutlineUser />
            Profile
          </NavLink>
        )}
        {userLoggedIn && (
          <button
            className="logout_button"
            onClick={logoutHandler}
            type="button"
          >
            <AiOutlineLogout className="icon" />
            Logout
          </button>
        )}
      </Menu>
    </nav>
  );
}
