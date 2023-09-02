import { NavLink } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import styles from './MainPage.module.scss';
import { Footer } from '../../components/Footer/Footer';
import {
  getCategories,
  getProductByID,
  getProductByKey,
  getProductsList,
} from '../../api/requests';

// TODO delete all tests and button
const getProductsTest = (): void => {
  getProductsList().then(
    (result) => {
      console.log('Should return list of products', result.body.results);
    },
    (error) => {
      console.log(error);
    },
  );
};

const getProductByIDTest = (): void => {
  getProductByID('73bd367d-271b-44c7-a599-d5fe8346605f').then(
    (result) => {
      console.log('Should return mango!', result.body);
    },
    (error) => {
      console.log(error);
    },
  );
};

const getProductByKeyTest = (): void => {
  getProductByKey('1').then(
    (result) => {
      console.log('Should return nectarine!', result.body);
    },
    (error) => {
      console.log(error);
    },
  );
};

const getCategoriesTest = (): void => {
  getCategories().then(
    (result) => {
      console.log('Should return categories!', result.body.results);
    },
    (error) => {
      console.log(error);
    },
  );
};

const testCallback = (): void => {
  getProductsTest();
  getProductByIDTest();
  getProductByKeyTest();
  getCategoriesTest();
};

export function MainPage(): React.ReactElement {
  return (
    <div className={styles.main_page}>
      <Header />
      <main className={styles.main}>
        <ul className={styles.links}>
          <li>
            <NavLink className={styles.link} to="/">
              Main
            </NavLink>
          </li>
          <li>
            <NavLink className={styles.link} to="/login">
              Login
            </NavLink>
          </li>
          <li>
            <NavLink className={styles.link} to="/registration">
              Registration
            </NavLink>
          </li>
          <li>
            <NavLink className={styles.link} to="/catalog">
              Catalog
            </NavLink>
          </li>
        </ul>
        <button type="button" onClick={testCallback}>
          Get test data
        </button>
      </main>
      <Footer />
    </div>
  );
}
