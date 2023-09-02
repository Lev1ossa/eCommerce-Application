import { NavLink } from 'react-router-dom';
import {
  MyCustomerAddAddressAction,
  MyCustomerUpdate,
} from '@commercetools/platform-sdk';
import { Header } from '../../components/Header/Header';
import styles from './MainPage.module.scss';
import { Footer } from '../../components/Footer/Footer';
import {
  getCategories,
  getCustomerData,
  getProductByID,
  getProductByKey,
  getProductsList,
  updateCustomerData,
} from '../../api/requests';
import { UserAdress } from '../../types/types';

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

// eslint-disable-next-line max-lines-per-function
const getCustomerDataTest = (): void => {
  getCustomerData().then(
    (result) => {
      console.log('Should return customer data!', result.body);
      const customerData = result.body;
      const customerAdresses: UserAdress[] = customerData.addresses.map(
        (adress) => {
          const { id, country, city, streetName, postalCode } = adress;
          const isShipping =
            id && customerData.shippingAddressIds
              ? customerData.shippingAddressIds.includes(id)
              : false;
          const isBilling =
            id && customerData.billingAddressIds
              ? customerData.billingAddressIds.includes(id)
              : false;
          const isDefaultShipping =
            id && customerData.defaultShippingAddressId
              ? customerData.defaultShippingAddressId.includes(id)
              : false;
          const isDefaultBilling =
            id && customerData.defaultBillingAddressId
              ? customerData.defaultBillingAddressId.includes(id)
              : false;
          const userAdress: UserAdress = {
            id,
            country,
            city,
            streetName,
            postalCode,
            isShipping,
            isBilling,
            isDefaultShipping,
            isDefaultBilling,
          };

          return userAdress;
        },
      );
      console.log('should return customer adresses', customerAdresses);
    },
    (error) => {
      console.log(error);
    },
  );
};

const updateCustomerDataTest = (): void => {
  getCustomerData().then(
    (result) => {
      const addAdressAction: MyCustomerAddAddressAction = {
        action: 'addAddress',
        address: {
          country: 'RU',
          city: 'NEW ADRESS!!!',
          streetName: 'NEW ADRESS!!!',
          postalCode: '111111',
        },
      };
      const body: MyCustomerUpdate = {
        version: result.body.version,
        actions: [addAdressAction],
      };
      updateCustomerData(body).then(
        (updateResult) => {
          console.log('Should return update result!', updateResult.body);
        },
        (error) => {
          console.log(error);
        },
      );
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
  getCustomerDataTest();
  updateCustomerDataTest();
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
