import { BsTrash3 } from 'react-icons/bs';
import styles from './RemoveButton.module.scss';

export function RemoveButton(): React.ReactElement {
  return (
    <button type="button" className={styles.button}>
      <BsTrash3 className={styles.trash} />
    </button>
  );
}
