import { IProduct } from '../../../../types/types';
import styles from './Card.module.scss';

export function Card(props: { product: IProduct }): JSX.Element {
  const { product } = props;
  const { id, name, type, category, price, tm } = product;
  console.log(id, name);

  return (
    <div className={styles.card}>
      <p>
        {id}: {name} {type} {category} {price} {tm}
      </p>
    </div>
  );
}
