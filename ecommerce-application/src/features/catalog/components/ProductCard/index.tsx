import { ProductProjection } from '@commercetools/platform-sdk';
import { Link } from 'react-router-dom';
import { BuyButton } from '../../../../components/UI/BuyButton';
import styles from './ProductCard.module.scss';

// eslint-disable-next-line max-lines-per-function
export function ProductCard(props: {
  product: ProductProjection;
}): React.ReactElement {
  const { product } = props;
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
        <BuyButton productId={id} />
      </div>
    </Link>
  );
}
