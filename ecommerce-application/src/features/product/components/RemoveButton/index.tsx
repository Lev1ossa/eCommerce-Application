import { BsTrash3 } from 'react-icons/bs';
import styles from './RemoveButton.module.scss';

export function RemoveButton(props: {
  isLoading: boolean;
  removeFromCartHandler: () => void;
  changeIsInCartState: () => void;
}): React.ReactElement {
  const { isLoading, removeFromCartHandler, changeIsInCartState } = props;
  return (
    <button
      type="button"
      className={styles.button}
      disabled={isLoading}
      onClick={(): void => {
        changeIsInCartState();
        removeFromCartHandler();
      }}
    >
      <BsTrash3 className={styles.trash} />
    </button>
  );
}
