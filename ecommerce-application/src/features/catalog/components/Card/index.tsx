import styles from './Card.module.scss';

interface IProduct {
  id: number;
  name: string;
  type: string;
  category: string;
  price: number;
  tm: string;
  img: string;
}
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
