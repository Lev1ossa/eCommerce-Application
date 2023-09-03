import { BiEditAlt } from 'react-icons/bi';
import { AiOutlineUser } from 'react-icons/ai';
import { useState } from 'react';
import { Customer } from '@commercetools/platform-sdk';
import styles from './Account.module.scss';
import { AccountContentInactive } from '../AccountContentInactive/AccountContentInactive';
import { AccountContentActive } from '../AccountContentActive/AccountContentActive';

export function Account(props: { userData: Customer }): React.ReactElement {
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
      </h3>
      {!editMode && (
        <AccountContentInactive styles={styles} userData={userData} />
      )}
      {editMode && (
        <AccountContentActive
          styles={styles}
          userData={userData}
          handleEditButton={handleEditButton}
        />
      )}
    </div>
  );
}
