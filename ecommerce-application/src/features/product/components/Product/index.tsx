import { useState } from 'react';
import { Modal } from '../../../modal';
import { Slider } from '../Slider';
import styles from './Product.module.scss';

export function Product(props: { name: string }): React.ReactElement {
  const { name } = props;
  const [modalActive, setModalActive] = useState(false);

  return (
    <>
      <div className={styles.product}>
        <div className={styles.container}>
          <div
            className={styles.slider}
            onClick={(): void => setModalActive(true)}
            aria-hidden
          >
            <Slider />
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
              consectetur adipisicing elit. Aperiam laudantium officia incidunt
              consequuntur quam sint repudiandae perspiciatis nihil, aliquid
              excepturi reprehenderit amet labore, non officiis dolores,
              voluptate et magnam nobis.
            </div>
          </div>
        </div>
      </div>
      <Modal active={modalActive} setActive={setModalActive} />
    </>
  );
}
