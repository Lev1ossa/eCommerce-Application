import { MdOutlineCancel } from 'react-icons/md';
import { BiEditAlt, BiSave } from 'react-icons/bi';
import { AiOutlineUser } from 'react-icons/ai';
import { useState } from 'react';
import { IUserData } from '../../../../types/types';
import styles from './Account.module.scss';
import { AccountContentInactive } from '../AccountContentInactive/AccountContentInactive';
import { AccountContentActive } from '../AccountContentActive/AccountContentActive';

// eslint-disable-next-line max-lines-per-function
export function Account(props: { userData: IUserData }): React.ReactElement {
  const { userData } = props;
  const [editMode, setEditMode] = useState(false);
  const handleEditButton = (): void => {
    setEditMode(!editMode);
  };
  return (
    <div className={styles.article}>
      <h3 className={styles.title}>
        <AiOutlineUser className={styles.icon} /> Account
        {!editMode && (
          <button
            className={styles.edit_button}
            onClick={handleEditButton}
            type="button"
          >
            <BiEditAlt className={styles.edit_button_icon} />
            Edit
          </button>
        )}
        {editMode && (
          <>
            <button
              className={styles.edit_button}
              onClick={handleEditButton}
              type="button"
            >
              <BiSave className={styles.edit_button_icon} />
              Save
            </button>
            <button
              className={styles.edit_button}
              onClick={handleEditButton}
              type="button"
            >
              <MdOutlineCancel className={styles.edit_button_icon} />
              Cancel
            </button>
          </>
        )}
      </h3>
      {!editMode && (
        <AccountContentInactive styles={styles} userData={userData} />
      )}
      {editMode && <AccountContentActive styles={styles} userData={userData} />}
    </div>
  );
}
