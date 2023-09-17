import { BsTrash3 } from 'react-icons/bs';
import styles from './RemoveButton.module.scss';

export function RemoveButton(props: {
  removeFromCartHandler: () => void;
  changeIsInCartState: () => void;
}): React.ReactElement {
  const { removeFromCartHandler, changeIsInCartState } = props;
  return (
    <button
      type="button"
      className={styles.button}
      onClick={(): void => {
        changeIsInCartState();
        removeFromCartHandler();
      }}
    >
      <BsTrash3 className={styles.trash} />
    </button>
  );
}
