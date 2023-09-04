import { NavLink, useNavigate } from 'react-router-dom';
import {
  MyCustomerAddAddressAction,
  MyCustomerChangePassword,
  MyCustomerUpdate,
} from '@commercetools/platform-sdk';
import { Header } from '../../components/Header/Header';
import styles from './MainPage.module.scss';
import { Footer } from '../../components/Footer/Footer';
import {
  getCategories,
  getCustomerData,
  getFilteredProductList,
  getProductByID,
  getProductByKey,
  getProductBySlug,
  getProductsList,
  searchProduct,
  updateCustomerData,
  updateCustomerPassword,
} from '../../api/requests';
import { CustomCategory, ToastTypes, UserAdress } from '../../types/types';
import { handleLogout } from '../../features/autentification';
import { showToast } from '../../features/autentification/utils/showToast';
import { isUserLoggedIn } from '../../api/tokenHandlers';

// eslint-disable-next-line max-lines-per-function
export function MainPage(): React.ReactElement {
  // TODO delete all tests and button and navigate
  const navigate = useNavigate();
  const handleRedirect = (): void => {
    if (!isUserLoggedIn()) {
      navigate('/catalog'); // TODO this navigate only for update header (user logged in). If it password change on profile page, we should redirect user to main page.
    }
  };

  const getProductsTest = async (): Promise<void> => {
    await getProductsList().then(
      (result) => {
        console.log('Should return list of products', result.body.results);
      },
      (error) => {
        console.log(error);
      },
    );
  };

  // eslint-disable-next-line max-lines-per-function
  const getFilteredProductsTest = async (): Promise<void> => {
    // const categoryID = 'dbab00bf-5d0b-4a4d-9cf0-17739113af5f';
    // const lowerPrice = '1';
    // const higherPrice = '150';
    const sortQueryStrings = [
      'price asc',
      'name.en asc',
      'variants.attributes.origin.key asc',
      'variants.attributes.trademark desc',
    ];
    const filterQueryStrings = [
      // `categories.id: subtree("${categoryID}")`,
      // `variants.attributes.origin.key:"foreign"`,
      // `variants.attributes.trademark:"Barbados"`,
      // `variants.price.centAmount:range (${lowerPrice} to ${higherPrice})`,
      '',
    ];
    await getFilteredProductList(filterQueryStrings, sortQueryStrings).then(
      (result) => {
        console.log(
          'Should return filtered list of products',
          result.body.results,
        );
      },
      (error) => {
        console.log(error);
      },
    );
  };

  const getProductByIDTest = async (): Promise<void> => {
    await getProductByID('2d86d24b-1c9b-443a-96c6-7805939d0be9').then(
      (result) => {
        console.log('Should return mango!', result.body);
      },
      (error) => {
        console.log(error);
      },
    );
  };

  const getProductByKeyTest = async (): Promise<void> => {
    await getProductByKey('1').then(
      (result) => {
        console.log('Should return nectarine!', result.body);
      },
      (error) => {
        console.log(error);
      },
    );
  };

  const getProductBySlugTest = async (): Promise<void> => {
    await getProductBySlug('banana').then(
      (result) => {
        console.log('Should return banana!', result.body);
      },
      (error) => {
        console.log(error);
      },
    );
  };

  const getCategoriesTest = async (): Promise<void> => {
    await getCategories().then(
      (result) => {
        const categories: CustomCategory[] = result.body.results.map(
          (category) => {
            const newCategory: CustomCategory = {
              id: category.id,
              parentID: category.parent?.id,
              key: category.key,
              slug: category.slug.en,
              name: category.name.en,
              children: [],
            };
            return newCategory;
          },
        );
        const categoriesTree = categories.filter(
          (category) => !category.parentID,
        );
        categories
          .filter((category) => category.parentID)
          .forEach((subcategory) => {
            const parentIdx = categoriesTree.findIndex(
              (item) => item.id === subcategory.parentID,
            );
            if (parentIdx !== -1) {
              categoriesTree[parentIdx].children.push(subcategory);
            }
          });
        console.log('Should return categories tree!', categoriesTree);
      },
      (error) => {
        console.log(error);
      },
    );
  };

  // eslint-disable-next-line max-lines-per-function
  const getCustomerDataTest = async (): Promise<void> => {
    await getCustomerData().then(
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

  const updateCustomerDataTest = async (): Promise<void> => {
    await getCustomerData().then(
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
            showToast(ToastTypes.success, `Your data has succesfully changed!`);
          },
          (error) => {
            showToast(ToastTypes.error, error.message);
          },
        );
      },
      (error) => {
        showToast(ToastTypes.error, error.message);
      },
    );
  };

  const updateCustomerPasswordTest = async (): Promise<void> => {
    await getCustomerData().then(
      (result) => {
        const body: MyCustomerChangePassword = {
          version: result.body.version,
          currentPassword: 'Qwerty12',
          newPassword: 'Qwerty12',
        };
        updateCustomerPassword(body).then(
          async (updateResult) => {
            console.log(
              'Should return update password result!',
              updateResult.body,
            );
            await handleLogout();
            handleRedirect();
            showToast(
              ToastTypes.success,
              `Your password has succesfully changed! You log out!`, // TODO: change toast message
            );
          },
          (error) => {
            console.log(error);
            showToast(ToastTypes.error, error.message);
          },
        );
      },
      (error) => {
        showToast(ToastTypes.error, error.message);
      },
    );
  };

  const searchProductTest = async (): Promise<void> => {
    await searchProduct('foreign').then(
      (result) => {
        console.log('Should return search result!', result.body);
      },
      (error) => {
        console.log(error);
      },
    );
  };

  const testCallback = async (): Promise<void> => {
    await getProductsTest();
    await getProductByIDTest();
    await getProductByKeyTest();
    await getProductBySlugTest();
    await getCategoriesTest();
    await getCustomerDataTest();
    await updateCustomerDataTest();
    await getFilteredProductsTest();
    await updateCustomerPasswordTest();
    await searchProductTest();
  };

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
        <button
          type="button"
          onClick={(): void => {
            testCallback();
          }}
        >
          Get test data
        </button>
      </main>
      <Footer />
    </div>
  );
}
