import { ProductProjection } from '@commercetools/platform-sdk';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getProductByID } from '../../../../api/requests';
import { Modal } from '../../../modal';
import { Slider } from '../Slider';
import styles from './Product.module.scss';

// eslint-disable-next-line max-lines-per-function
export function Product(props: { name: string }): React.ReactElement {
  const { name } = props;
  const [modalActive, setModalActive] = useState(false);
  const [product, setProduct] = useState<ProductProjection>();
  const [isLoading, setIsLoading] = useState(true);

  const productCard = useLocation();

  useEffect(() => {
    getProductByID(productCard.state).then(
      (result) => {
        setProduct(result.body);
        setIsLoading(false);
      },
      (error) => {
        console.log(error);
      },
    );
  }, [productCard.state]);

  console.log(product);

  return (
    <>
      {!isLoading ? (
        <div className={styles.product}>
          <div className={styles.container}>
            <div className={styles.slider}>
              <Slider setActive={setModalActive} />
            </div>
            <div className={styles.details}>
              <div className={styles.name}>{name}</div>
              <div className={styles.price}>$ 1.44</div>
              <div className={styles.category}>Citrus</div>
              <div className={styles.trademark}>Victoria</div>
              <button type="button" className={styles.button}>
                Add to cart
              </button>
              <div className={styles.description}>
                <strong>Description: </strong> Lorem ipsum dolor sit, amet
                consectetur adipisicing elit. Aperiam laudantium officia
                incidunt consequuntur quam sint repudiandae perspiciatis nihil,
                aliquid excepturi reprehenderit amet labore, non officiis
                dolores, voluptate et magnam nobis.
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h1>Loading</h1>
      )}
      <Modal active={modalActive} setActive={setModalActive} title={name}>
        <div className={styles.slider_modal}>
          <Slider setActive={setModalActive} />
        </div>
      </Modal>
    </>
  );
}
