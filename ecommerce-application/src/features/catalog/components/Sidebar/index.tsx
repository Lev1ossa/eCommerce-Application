import { FiSearch } from 'react-icons/fi';
import {
  Menu,
  MenuItem,
  Sidebar,
  SubMenu,
  sidebarClasses,
} from 'react-pro-sidebar';
import styles from './Sidebar.module.scss';

// eslint-disable-next-line max-lines-per-function
export function CatalogSidebar(): React.ReactElement {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar
        className={styles.sidebar}
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            overflow: 'visible',
          },
        }}
      >
        <Menu
          rootStyles={{
            position: 'sticky',
            top: '1.5rem',
          }}
        >
          <div className={styles.search}>
            <input
              className={styles.input}
              type="text"
              placeholder="search..."
            />
            <FiSearch className={styles.search_icon} />
          </div>
          <SubMenu label="Fruits">
            <MenuItem> Citrus</MenuItem>
            <MenuItem> Tropical</MenuItem>
            <MenuItem> Stoned</MenuItem>
          </SubMenu>
          <SubMenu label="Vegetables">
            <MenuItem> 1</MenuItem>
            <MenuItem> 2</MenuItem>
          </SubMenu>
          <SubMenu label="Berries">
            <MenuItem> 1</MenuItem>
            <MenuItem> 2</MenuItem>
          </SubMenu>
          <SubMenu label="Filters" defaultOpen>
            <ul className={styles.filters}>
              <li>
                <input className="checkbox" type="checkbox" />
                <span className="text">Name</span>
              </li>
              <li>
                <input className="checkbox" type="checkbox" /> Price
              </li>
              <li>
                <input className="checkbox" type="checkbox" /> Origin
              </li>
              <li>
                <input className="checkbox" type="checkbox" /> TM
              </li>
            </ul>
          </SubMenu>
        </Menu>
      </Sidebar>
    </div>
  );
}
