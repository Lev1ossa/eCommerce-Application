import { Product } from '@commercetools/platform-sdk';
import { Link } from 'react-router-dom';
import styles from './ProductCard.module.scss';

export function ProductCard(props: { product: Product }): React.ReactElement {
  const { product } = props;
  const { id } = product;
  const name = product.masterData.current.name.en;

  const { prices, attributes, images } =
    product.masterData.current.masterVariant;

  const price = prices ? prices[0].value.centAmount / 100 : 0;
  const image = images ? images[0].url : '';
  const tradeMark = attributes ? attributes[0].value : 'good food';

  return (
    <Link to={`/catalog/category/subcategory/${name.toLowerCase()}`} state={id}>
      <div className={styles.card}>
        <img src={image} className={styles.image} alt="product" />
        <div className={styles.description}>
          <div className={styles.product_info}>
            <p className={styles.price}>${price}</p>
            <strong className={styles.name}>{name}</strong>
            {/* <p className={styles.category}>Category:{category}</p> */}
            <p className={styles.tm}>TM:{tradeMark}</p>
          </div>
        </div>
        <button
          type="button"
          className={styles.button}
          onClick={(e): void => e.preventDefault()}
        >
          Add to cart
        </button>
      </div>
    </Link>
  );
}
