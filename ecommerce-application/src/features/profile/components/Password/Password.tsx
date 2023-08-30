import { useState } from 'react';
import { AiOutlineLock } from 'react-icons/ai';
import { BiEditAlt } from 'react-icons/bi';
import { IUserData } from '../../../../types/types';
import styles from './Password.module.scss';
import { PasswordContentInactive } from '../PasswordContentInactive/PasswordContentInactive';
import { PasswordContentActive } from '../PasswordContentActive/PasswordContentActive';

export function Password(props: { userData: IUserData }): React.ReactElement {
  const { userData } = props;
  const [editMode, setEditMode] = useState(false);
  const handleEditButton = (): void => {
    setEditMode(!editMode);
  };
  return (
    <div className={styles.article}>
      <h3 className={styles.title}>
        <AiOutlineLock className={styles.icon} /> Password
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
        <PasswordContentInactive styles={styles} userData={userData} />
      )}
      {editMode && (
        <PasswordContentActive
          styles={styles}
          userData={userData}
          handleEditButton={handleEditButton}
        />
      )}
    </div>
  );
}
