import { FiSearch } from 'react-icons/fi';
import {
  Menu,
  MenuItem,
  Sidebar,
  SubMenu,
  menuClasses,
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
            [`.${menuClasses.button}`]: {
              ':hover': {
                backgroundColor: '#64e44c',
              },
            },
            // position: 'sticky',
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
            <ul className={styles.list}>
              <li className={styles.price}>
                <strong>Price</strong>
                <input type="text" placeholder="min" />
                <input type="text" placeholder="max" />
              </li>
              <li className={styles.brand}>
                <ul className={styles.brand_list}>
                  <strong>Brands</strong>
                  <li>
                    <input type="checkbox" />
                    <span className="text">Barbados</span>
                  </li>
                  <li>
                    <input type="checkbox" />
                    <span className="text">Campari</span>
                  </li>
                  <li>
                    <input type="checkbox" />
                    <span className="text">Cara Navel</span>
                  </li>
                  <li>
                    <input type="checkbox" />
                    <span className="text">Cosmic Crisp</span>
                  </li>
                  <li>
                    <input type="checkbox" />
                    <span className="text">Dream</span>
                  </li>
                  <li>
                    <input type="checkbox" />
                    <span className="text">Victoria</span>
                  </li>
                  <li>
                    <input type="checkbox" />
                    <span className="text">Vegan</span>
                  </li>
                </ul>
              </li>
              <li className={styles.brand}>
                <ul className={styles.brand_list}>
                  <strong>Origin</strong>
                  <li>
                    <input type="checkbox" />
                    <span className="text">Local</span>
                  </li>
                  <li>
                    <input type="checkbox" />
                    <span className="text">Foreign</span>
                  </li>
                </ul>
              </li>
            </ul>
          </SubMenu>
          <SubMenu label="Sort" defaultOpen>
            <ul className={`${styles.list} ${styles.brand_list}`}>
              <li>
                <input type="checkbox" />
                <span>Name</span>
              </li>
              <li>
                <input type="checkbox" /> Price
              </li>
              <li>
                <input type="checkbox" /> Origin
              </li>
              <li>
                <input type="checkbox" /> TM
              </li>
            </ul>
          </SubMenu>
        </Menu>
      </Sidebar>
    </div>
  );
}
