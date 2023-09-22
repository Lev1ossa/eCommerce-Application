import { NavLink } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import { AiOutlineLogin, AiOutlineLogout } from 'react-icons/ai';
import { BsCart3, BsMoonStars, BsSun } from 'react-icons/bs';
import { useContext } from 'react';
import styles from './Nav.module.scss';
import { getTheme, toggleTheme } from '../../../App/utils/utils';
import { themeContext } from '../../../context/themeContext';

// eslint-disable-next-line max-lines-per-function
export function Nav(props: {
  className: ({ isActive }: { isActive: boolean }) => string;
  userLoggedIn: boolean;
  logoutHandler: () => Promise<void>;
  quantityProducts: number | undefined;
}): React.ReactElement {
  const { className, userLoggedIn, logoutHandler, quantityProducts } = props;

  // const [currentTheme, setCurrentTheme] = useState(
  //   localStorage.getItem('AAA-Ecom-theme'),
  // );

  const theme = useContext(themeContext);

  const buttonIcon =
    theme.theme === 'dark' ? (
      <BsMoonStars className={styles.button_icon} />
    ) : (
      <BsSun className={styles.button_icon} />
    );

  return (
    <nav>
      <ul className={styles.links}>
        <li>
          <button
            className={styles.theme_button}
            onClick={(): void => {
              toggleTheme();
              theme.setTheme(getTheme());
            }}
            type="button"
          >
            {buttonIcon}
          </button>
        </li>
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
        <li>
          <NavLink className={className} to="/about_us">
            About Us
          </NavLink>
        </li>
        {!userLoggedIn && (
          <li>
            <NavLink className={className} to="/registration">
              Registration
            </NavLink>
          </li>
        )}
        <li>
          <NavLink className={className} to="/cart">
            <div className={styles.icon_container}>
              <BsCart3 className={styles.header_icon} />
              {quantityProducts && quantityProducts > 0 && (
                <span className={styles.count_label}>{quantityProducts}</span>
              )}
            </div>
          </NavLink>
        </li>
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
            <button
              className={styles.logout_button}
              onClick={logoutHandler}
              type="button"
            >
              <AiOutlineLogout className={styles.header_icon} />
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}
