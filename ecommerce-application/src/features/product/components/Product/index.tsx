import { Image, ProductProjection } from '@commercetools/platform-sdk';
import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getProductBySlug } from '../../../../api/requests';
import { Loader } from '../../../../components/Loader';
import { BuyButton } from '../../../../components/UI/BuyButton';
import { BuyCountButton } from '../../../../components/UI/BuyCountButton';
import { CartContext } from '../../../../context/CartContext';
import { ToastTypes } from '../../../../types/types';
import { showToast } from '../../../autentification/utils/showToast';
import { Breadcrumb } from '../../../breadcrumb/components/Breadcrumps/Breadcrumb';
import { Modal } from '../../../modal';
import { RemoveButton } from '../RemoveButton';
import { Slider } from '../Slider';
import styles from './Product.module.scss';

// eslint-disable-next-line max-lines-per-function
export function Product(props: {
  categorySlug: string;
  subCategorySlug: string;
  slug: string;
}): React.ReactElement {
  const navigate = useNavigate();
  const cart = useContext(CartContext);
  const { categorySlug, subCategorySlug, slug } = props;
  const [modalActive, setModalActive] = useState(false);
  const [product, setProduct] = useState<ProductProjection>();
  const [isLoading, setIsLoading] = useState(true);
  const [isProductInCart, setIsProductInCart] = useState(false);
  const [productCount, setProductCount] = useState(1);

  const productCard = useLocation();

  useEffect(() => {
    getProductBySlug(slug).then(
      (result) => {
        const productResult = result.body.results[0];
        if (productResult) {
          setProduct(productResult);
          setIsLoading(false);
        } else {
          showToast(ToastTypes.error, 'Product is not found!');
          navigate('/404');
        }
      },
      (error: Error) => {
        console.log(error);
      },
    );
  }, [productCard.state, slug, navigate]);

  let price = 0;
  let priceDiscounted: number | null = null;
  let productId = '';
  let productName = '';
  let trademark = '';
  let description = '';
  let category = '';
  let subCategory = '';
  let origin = '';
  let productImages: Image[] | undefined = [];
  if (product) {
    const { prices, attributes, images } = product.masterVariant;
    productId = product.id;
    productName = product.name.en;
    price = prices ? prices[0].value.centAmount / 100 : 0;
    priceDiscounted =
      prices && prices[0].discounted
        ? prices[0].discounted.value.centAmount / 100
        : null;
    trademark = attributes ? attributes[0].value : '';
    category = attributes ? attributes[1].value : '';
    origin = attributes ? attributes[3].value.label : '';
    subCategory = attributes ? attributes[2].value.replace('_', ' ') : '';
    description = product.description ? product.description.en : '';
    if (images) {
      productImages = images;
    }
  }

  useEffect(() => {
    setIsProductInCart(cart.isItemInCart(productId));
    setProductCount(cart.getItemCount(productId));
  }, [cart, productId]);

  const changeIsInCartState = (): void => {
    setIsProductInCart(true);
  };
  const removeProductFromCart = (): void => {
    cart.removeItemFromCart(productId);
  };

  const addToCartHandler = (): void => {
    cart.addItemToCart(productId);
  };

  return (
    <>
      {!isLoading ? (
        <>
          <Breadcrumb
            categorySlug={categorySlug}
            subCategorySlug={subCategorySlug}
            slug={slug}
          />
          <div className={styles.product}>
            <div className={styles.container}>
              <div className={styles.slider}>
                <Slider setActive={setModalActive} images={productImages} />
              </div>
              <div className={styles.details}>
                <div className={styles.name}>
                  <strong>{productName}</strong>
                </div>
                {priceDiscounted && (
                  <div className={styles.prices_container}>
                    <div className={styles.price_new}>$ {priceDiscounted}</div>
                    <div className={styles.price_old}>$ {price}</div>
                  </div>
                )}
                {!priceDiscounted && (
                  <div className={styles.price}>$ {price}</div>
                )}
                <div className={styles.category}>
                  <span className={styles.bold}>Category: </span>
                  {category}
                </div>
                <div className={styles.category}>
                  <span className={styles.bold}>Subcategory: </span>
                  {subCategory}
                </div>
                <div className={styles.category}>
                  <span className={styles.bold}>Origin: </span>
                  {origin}
                </div>
                <div className={styles.trademark}>
                  <span className={styles.bold}>TM: </span>
                  {trademark}
                </div>
                <div className={styles.button}>
                  {isProductInCart ? (
                    <BuyCountButton
                      addToCartHandler={addToCartHandler}
                      productCount={productCount}
                    />
                  ) : (
                    <BuyButton
                      isProductInCart={isProductInCart}
                      addToCartHandler={addToCartHandler}
                    />
                  )}
                  {isProductInCart && (
                    <RemoveButton
                      changeIsInCartState={changeIsInCartState}
                      removeProductFromCart={removeProductFromCart}
                    />
                  )}
                </div>
                <div className={styles.description}>
                  <strong>Description: </strong> {description}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}
      {!isLoading && (
        <Modal
          active={modalActive}
          setActive={setModalActive}
          title={productName}
        >
          <div className={styles.slider_modal}>
            <Slider setActive={setModalActive} images={productImages} />
          </div>
        </Modal>
      )}
    </>
  );
}
