import { Image, ProductProjection } from '@commercetools/platform-sdk';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getProductBySlug } from '../../../../api/requests';
import { Loader } from '../../../../components/Loader';
import { Modal } from '../../../modal';
import { Slider } from '../Slider';
import styles from './Product.module.scss';
import { ToastTypes } from '../../../../types/types';
import { showToast } from '../../../autentification/utils/showToast';
import { Breadcrumb } from '../../../breadcrumb/components/Breadcrumps/Breadcrumb';

// eslint-disable-next-line max-lines-per-function
export function Product(props: {
  categorySlug: string;
  subCategorySlug: string;
  slug: string;
}): React.ReactElement {
  const navigate = useNavigate();
  const { categorySlug, subCategorySlug, slug } = props;
  console.log('result', categorySlug, subCategorySlug, slug);
  const [modalActive, setModalActive] = useState(false);
  const [product, setProduct] = useState<ProductProjection>();
  const [isLoading, setIsLoading] = useState(true);

  console.log('props', props);

  const productCard = useLocation();

  console.log(
    `BreadCrumb template: ${categorySlug} > ${subCategorySlug} > ${slug}`,
  );

  useEffect(() => {
    getProductBySlug(slug).then(
      (result) => {
        const productResult = result.body.results[0];
        if (productResult) {
          setProduct(productResult);
          setIsLoading(false);
        } else {
          showToast(ToastTypes.error, 'Product is not found!');
          navigate('/404');
        }
      },
      (error) => {
        console.log(error);
      },
    );
  }, [productCard.state, slug, navigate]);

  let price = 0;
  let productName = '';
  let trademark = '';
  let description = '';
  let category = '';
  let subCategory = '';
  let origin = '';
  let productImages: Image[] | undefined = [];
  if (product) {
    const { prices, attributes, images } = product.masterVariant;
    productName = product.name.en;
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
        <>
          <Breadcrumb
            categorySlug={categorySlug}
            subCategorySlug={subCategorySlug}
            slug={slug}
          />
          <div className={styles.product}>
            <div className={styles.container}>
              <div className={styles.slider}>
                <Slider setActive={setModalActive} images={productImages} />
              </div>
              <div className={styles.details}>
                <div className={styles.name}>
                  <strong>{productName}</strong>
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
        </>
      ) : (
        <Loader />
      )}
      {!isLoading && (
        <Modal
          active={modalActive}
          setActive={setModalActive}
          title={productName}
        >
          <div className={styles.slider_modal}>
            <Slider setActive={setModalActive} images={productImages} />
          </div>
        </Modal>
      )}
    </>
  );
}
