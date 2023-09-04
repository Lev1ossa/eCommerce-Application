import { NavLink } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import { AiOutlineLogin, AiOutlineLogout } from 'react-icons/ai';
import styles from './Nav.module.scss';

// eslint-disable-next-line max-lines-per-function
export function Nav(props: {
  className: ({ isActive }: { isActive: boolean }) => string;
  userLoggedIn: boolean;
  logoutHandler: React.MouseEventHandler<HTMLAnchorElement>;
}): React.ReactElement {
  const { className, userLoggedIn, logoutHandler } = props;
  return (
    <nav>
      <ul className={styles.links}>
        <li>
          <NavLink className={className} to="/">
            Main
          </NavLink>
        </li>
        <li>
          <NavLink className={className} to="/catalog">
            Catalog
          </NavLink>
        </li>
        {!userLoggedIn && (
          <li>
            <NavLink className={className} to="/registration">
              Registration
            </NavLink>
          </li>
        )}
        {!userLoggedIn && (
          <li>
            <NavLink className={className} to="/login">
              <AiOutlineLogin className={styles.header_icon} />
            </NavLink>
          </li>
        )}
        {userLoggedIn && (
          <li>
            <NavLink className={className} to="/profile">
              <CgProfile className={styles.header_icon} />
            </NavLink>
          </li>
        )}
        {userLoggedIn && (
          <li>
            <NavLink onClick={logoutHandler} className={styles.inactive} to="#">
              <AiOutlineLogout className={styles.header_icon} />
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}
