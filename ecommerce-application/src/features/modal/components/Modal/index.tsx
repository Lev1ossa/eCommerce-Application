import { Dispatch, SetStateAction } from 'react';
import { MdOutlineClose } from 'react-icons/md';
import styles from './Modal.module.scss';

export function Modal(props: {
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
  title: string;
  children: React.ReactNode;
}): React.ReactElement {
  const { title, active, setActive, children } = props;
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
        <header className={styles.modal_header}>
          <h3 className={styles.title}>{title}</h3>
          <MdOutlineClose
            className={styles.close}
            onClick={(): void => setActive(false)}
          />
        </header>
        {children}
      </div>
    </div>
  );
}
