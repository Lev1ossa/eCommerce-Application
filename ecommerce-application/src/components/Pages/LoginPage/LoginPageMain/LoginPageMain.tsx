import { SubmitHandler, useForm } from 'react-hook-form';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ServiceInputParameters } from '../../../../services/inputService';
import { ILoginData, IRegistrationData } from '../../../../types/types';
import { FormInput } from '../../../UI/FormInput/FormInput';
import { FormPasswordInput } from '../../../UI/FormPasswordInput/FormPasswordInput';
import { Error } from '../../../UI/Error/Error';
import styles from './LoginPageMain.module.scss';
import { handleLogin } from '../../../../utils/authHandlers';

// eslint-disable-next-line max-lines-per-function
export function LoginPageMain(): React.ReactElement {
  // const [, setPageForbidden] = useState(false);
  const navigate = useNavigate();
  const handleRedirect = (): void => {
    if (localStorage.getItem('AAA-Ecom-refreshToken')) {
      navigate('/');
    }
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IRegistrationData>({ mode: 'onChange' });
  const onSubmit: SubmitHandler<ILoginData> = async (
    loginData: ILoginData,
  ): Promise<void> => {
    await handleLogin(loginData);
    handleRedirect();
  };
  const inputService = new ServiceInputParameters(register);

  useEffect(handleRedirect);

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
      <ToastContainer />
    </main>
  );
}
