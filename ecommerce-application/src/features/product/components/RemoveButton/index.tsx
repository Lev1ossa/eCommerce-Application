import { BsTrash3 } from 'react-icons/bs';
import styles from './RemoveButton.module.scss';

export function RemoveButton(props: {
  removeProductFromCart: () => void;
  changeIsInCartState: () => void;
}): React.ReactElement {
  const { removeProductFromCart, changeIsInCartState } = props;
  return (
    <button
      type="button"
      className={styles.button}
      onClick={(): void => {
        changeIsInCartState();
        removeProductFromCart();
      }}
    >
      <BsTrash3 className={styles.trash} />
    </button>
  );
}
