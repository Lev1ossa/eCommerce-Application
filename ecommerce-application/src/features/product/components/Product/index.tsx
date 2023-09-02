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
      (error) => console.log(error),
    );
  }, [productCard.state]);

  let price = 0;
  let trademark = '';
  let description = '';
  if (product) {
    const { prices, attributes } = product.masterVariant;
    price = prices ? prices[0].value.centAmount / 100 : 0;
    trademark = attributes ? attributes[0].value : '';
    description = product.description ? product.description.en : '';
  }

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
              <div className={styles.price}>$ {price}</div>
              <div className={styles.category}>Citrus</div>
              <div className={styles.trademark}>{trademark}</div>
              <button type="button" className={styles.button}>
                Add to cart
              </button>
              <div className={styles.description}>
                <strong>Description: </strong> {description}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h1>Loader</h1>
      )}
      <Modal active={modalActive} setActive={setModalActive} title={name}>
        <div className={styles.slider_modal}>
          <Slider setActive={setModalActive} />
        </div>
      </Modal>
    </>
  );
}
