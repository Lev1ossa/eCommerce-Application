import { SubmitHandler, Validate, useForm } from 'react-hook-form';
import { IRegistrationData } from '../../../../interfaces/types';
import { FormInput } from '../../../UI/FormInput/FormInput';
import { Error } from '../../../common/Error/Error';
import styles from './RegistrationPageMain.module.scss';
import { dataRegistrationPage } from './data/dataRegistrationPageMain';

// eslint-disable-next-line max-lines-per-function
export function RegistrationPageMain(): React.ReactElement {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IRegistrationData>({
    mode: 'onChange',
    criteriaMode: 'all',
  });
  const onSubmit: SubmitHandler<IRegistrationData> = (
    data: IRegistrationData,
  ): void => {
    console.log('RESULT', data);
  };
  const formInputs = dataRegistrationPage.map((el) => {
    return {
      type: el.type,
      value: register(
        el.name as
          | 'email'
          | 'userFirstName'
          | 'userSecondName'
          | 'birthDate'
          | 'street'
          | 'city'
          | 'postalCode'
          | 'password',
        el.options as unknown as Record<
          string,
          Validate<string, IRegistrationData>
        >,
      ),
    };
  });
  return (
    <main className={styles.main_block}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Register</h2>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {formInputs.map((item) => (
            <>
              <FormInput
                key={item.value.name}
                input={item.value}
                type={item.type}
              />
              <Error errors={errors} name={item.value.name} />
            </>
          ))}
          <Error errors={errors} name="postalCode" />
          <p className={styles.label}>Country:</p>
          <select className={styles.select_country}>
            <option>Belarus</option>
            <option>Russia</option>
          </select>
          <button className={styles.submit_button} type="submit">
            Sign up
          </button>
        </form>
        <div className={styles.container}>
          <p className={styles.text}>Already have an account?</p>
          <button className={styles.button_login} type="button">
            Log in now
          </button>
        </div>
      </div>
    </main>
  );
}
