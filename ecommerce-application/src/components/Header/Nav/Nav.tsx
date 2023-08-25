import { NavLink } from 'react-router-dom';
import styles from './Nav.module.scss';

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
        {!userLoggedIn && (
          <li>
            <NavLink className={className} to="/login">
              Login
            </NavLink>
          </li>
        )}
        {!userLoggedIn && (
          <li>
            <NavLink className={className} to="/registration">
              Registration
            </NavLink>
          </li>
        )}
        {userLoggedIn && (
          <li>
            <NavLink onClick={logoutHandler} className={styles.inactive} to="#">
              Logout
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}
