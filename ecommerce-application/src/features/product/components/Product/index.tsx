import { Image, ProductProjection } from '@commercetools/platform-sdk';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getProductByID } from '../../../../api/requests';
import { Loader } from '../../../../components/Loader';
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
  let category = '';
  let subCategory = '';
  let origin = '';
  let productImages: Image[] | undefined = [];
  if (product) {
    const { prices, attributes, images } = product.masterVariant;
    price = prices ? prices[0].value.centAmount / 100 : 0;
    trademark = attributes ? attributes[0].value : '';
    category = attributes ? attributes[1].value : '';
    origin = attributes ? attributes[3].value.label : '';
    subCategory = attributes ? attributes[2].value.replace('_', ' ') : '';
    description = product.description ? product.description.en : '';
    if (images) {
      productImages = images;
    }
  }

  return (
    <>
      {!isLoading ? (
        <div className={styles.product}>
          <div className={styles.container}>
            <div className={styles.slider}>
              <Slider setActive={setModalActive} images={productImages} />
            </div>
            <div className={styles.details}>
              <div className={styles.name}>
                <strong>{name}</strong>
              </div>
              <div className={styles.price}>$ {price}</div>
              <div className={styles.category}>{category}</div>
              <div className={styles.category}>{subCategory}</div>
              <div className={styles.category}>{origin}</div>
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
        <Loader />
      )}
      {!isLoading && (
        <Modal active={modalActive} setActive={setModalActive} title={name}>
          <div className={styles.slider_modal}>
            <Slider setActive={setModalActive} images={productImages} />
          </div>
        </Modal>
      )}
    </>
  );
}
