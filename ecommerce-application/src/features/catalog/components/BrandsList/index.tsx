import { ChangeEvent } from 'react';
import styles from './BrandsList.module.scss';

export default function BrandsList(props: {
  brands: string[];
  handleBrandsClick: (
    event: ChangeEvent<HTMLInputElement>,
    value: string,
  ) => void;
}): React.ReactElement {
  const { brands, handleBrandsClick } = props;
  return (
    <ul className={styles.brand_list}>
      <strong>Brands</strong>
      {brands.map((brand: string) => (
        <li key={brand}>
          <input
            type="checkbox"
            onChange={(event): void => handleBrandsClick(event, brand)}
          />
          <span className={styles.label}>{brand}</span>
        </li>
      ))}
    </ul>
  );
}
