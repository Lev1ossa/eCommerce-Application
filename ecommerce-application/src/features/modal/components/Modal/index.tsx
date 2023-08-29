import { Dispatch, SetStateAction } from 'react';
import styles from './Modal.module.scss';

export function Modal(props: {
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
}): React.ReactElement {
  const { active, setActive } = props;
  return (
    <div
      className={
        active ? `${styles.modal} ${styles.modal_active}` : styles.modal
      }
      onClick={(): void => setActive(false)}
      aria-hidden
    >
      <div
        className={
          active ? `${styles.content} ${styles.content_active}` : styles.content
        }
        onClick={(e): void => e.stopPropagation()}
        aria-hidden
      >
        modal
      </div>
    </div>
  );
}
