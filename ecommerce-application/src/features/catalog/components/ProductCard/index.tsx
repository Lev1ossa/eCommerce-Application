import { ProductProjection } from '@commercetools/platform-sdk';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  addToCart,
  getActiveCart,
  removeFromCart,
} from '../../../../api/requests';
import { BuyButton } from '../../../../components/UI/BuyButton';
import { BuyCountButton } from '../../../../components/UI/BuyCountButton';
import { CartContext } from '../../../../context/CartContext';
import styles from './ProductCard.module.scss';

// eslint-disable-next-line max-lines-per-function
export function ProductCard(props: {
  product: ProductProjection;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}): React.ReactElement {
  const [isProductInCart, setIsProductInCart] = useState(false);
  const [productCount, setProductCount] = useState(1);
  const [lineItemID, setLineItemID] = useState('');

  const cart = useContext(CartContext);

  const { product, isLoading, setIsLoading } = props;
  const { id } = product;
  const slug = product.slug.en;
  const name = product.name.en;
  const description = product.description?.en.slice(0, 65).concat('...');

  const { prices, attributes, images } = product.masterVariant;

  const price = prices ? prices[0].value.centAmount / 100 : 0;
  const priceDiscounted =
    prices && prices[0].discounted
      ? prices[0].discounted.value.centAmount / 100
      : null;
  const image = images ? images[0].url : '';
  const tradeMark = attributes ? attributes[0].value : 'good food';
  const category = attributes ? attributes[1].value : '';
  const subCategory = attributes ? attributes[2].value : '';
  const origin = attributes ? attributes[3].value.label : '';

  useEffect(() => {
    setIsProductInCart(cart.isItemInCart(id));
    setProductCount(cart.getItemCount(id));
    setLineItemID(cart.getLineItemId(id));
  }, [cart, id]);

  const addToCartHandler = (): void => {
    setIsLoading(true);
    getActiveCart().then(
      (cartResponse) => {
        const cartBody = cartResponse.body;
        const quantity = 1;
        addToCart(cartBody, id, quantity).then(
          (result) => {
            cart.setCartItems(result.body.lineItems);
            setIsLoading(false);
          },
          (error: Error) => console.log(error),
        );
      },
      (error: Error) => console.log(error),
    );
  };

  const removeFromCartHandler = (): void => {
    if (lineItemID) {
      setIsLoading(true);
      getActiveCart().then(
        (cartResponse) => {
          const cartBody = cartResponse.body;
          const quantity = 1;
          removeFromCart(cartBody, lineItemID, quantity).then(
            (result) => {
              cart.setCartItems(result.body.lineItems);
              setIsLoading(false);
            },
            (error: Error) => console.log(error),
          );
        },
        (error: Error) => console.log(error),
      );
    }
  };

  return (
    <Link
      to={`/catalog/${category.toLowerCase()}/${subCategory.toLowerCase()}/${slug}`}
      state={id}
    >
      <div className={styles.card}>
        <img src={image} className={styles.image} alt="product" />
        <div className={styles.description}>
          <div className={styles.product_info}>
            {priceDiscounted && (
              <div className={styles.prices_container}>
                <div className={styles.price_new}>$ {priceDiscounted}</div>
                <div className={styles.price_old}>$ {price}</div>
              </div>
            )}
            {!priceDiscounted && <div className={styles.price}>$ {price}</div>}
            <strong className={styles.name}>{name}</strong>
            <p className={styles.tm}>TM:{tradeMark}</p>
            <p className={styles.info}>
              <strong>Category: </strong>
              {category}
            </p>
            <p className={styles.info}>
              <strong>Origin: </strong>
              {origin}
            </p>
            <p className={styles.info}>{description}</p>
          </div>
        </div>
        {isProductInCart ? (
          <BuyCountButton
            isLoading={isLoading}
            addToCartHandler={addToCartHandler}
            removeFromCartHandler={removeFromCartHandler}
            productCount={productCount}
          />
        ) : (
          <BuyButton
            isLoading={isLoading}
            isProductInCart={isProductInCart}
            addToCartHandler={addToCartHandler}
          />
        )}
      </div>
    </Link>
  );
}
