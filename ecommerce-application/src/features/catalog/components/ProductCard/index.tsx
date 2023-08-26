import { IProduct } from '../../../../types/types';
import styles from './ProductCard.module.scss';

export function ProductCard(props: { product: IProduct }): React.ReactElement {
  const { product } = props;
  const { id, name, type, category, price, tm } = product;

  return (
    <div className={styles.card}>
      <p>
        {id}: {name} {type} {category} {price} {tm}
      </p>
    </div>
  );
}
