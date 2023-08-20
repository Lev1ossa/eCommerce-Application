import { SubmitHandler, useForm } from 'react-hook-form';
import { ServiceInputParameters } from '../../../../services/inputService';
import { ILoginData, IRegistrationData } from '../../../../types/types';
import { FormInput } from '../../../UI/FormInput/FormInput';
import { FormPasswordInput } from '../../../UI/FormPasswordInput/FormPasswordInput';
import { Error } from '../../../common/Error/Error';
import styles from './LoginPageMain.module.scss';
import { getUser } from '../../../../utils/requests';
import { CustomTokenCache } from '../../../../utils/tokenCache';

// eslint-disable-next-line max-lines-per-function
export function LoginPageMain(): React.ReactElement {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IRegistrationData>({ mode: 'onChange' });
  const onSubmit: SubmitHandler<ILoginData> = (loginData: ILoginData): void => {
    console.log('RESULT', loginData);
    const tokenCache = new CustomTokenCache();
    getUser(loginData, tokenCache).then(
      (result) => {
        console.log(result);
        console.log(tokenCache.get());
      }, // TODO save refresh token to local host (from tokenCache.get())
      (error) => console.log(error), // TODO add toast
    );
  };
  const inputService = new ServiceInputParameters(register);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h2 className={styles.title}>Login</h2>
        <form
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <FormInput
            input={inputService.createInputParams('email').input}
            type={inputService.createInputParams('email').type}
            label={inputService.createInputParams('email').label}
          />
          <Error errors={errors} name="email" />
          <FormPasswordInput
            input={inputService.createInputParams('password').input}
            type={inputService.createInputParams('email').type}
            label={inputService.createInputParams('password').label}
          />
          <Error errors={errors} name="password" />
          <button className={styles.login_btn} type="submit">
            Log in
          </button>
        </form>
        <p>Don&apos;t have an account yet?</p>
        <button className={styles.signup_btn} type="button">
          Sign up now
        </button>
      </div>
    </main>
  );
}
