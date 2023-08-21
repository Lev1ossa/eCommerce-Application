import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { ServiceInputParameters } from '../../../../services/inputService';
import { ILoginData, IRegistrationData } from '../../../../types/types';
import { handleLogin } from '../../../../utils/authHandlers';
import { Error } from '../../../UI/Error/Error';
import { FormInput } from '../../../UI/FormInput/FormInput';
import { FormPasswordInput } from '../../../UI/FormPasswordInput/FormPasswordInput';
import styles from './LoginPageMain.module.scss';

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
          <div className={styles.form_item}>
            <FormInput
              input={inputService.createInputParams('email').input}
              type={inputService.createInputParams('email').type}
              label={inputService.createInputParams('email').label}
            />
            <Error errors={errors} name="email" />
          </div>
          <div className={styles.form_item}>
            <FormPasswordInput
              input={inputService.createInputParams('password').input}
              type={inputService.createInputParams('email').type}
              label={inputService.createInputParams('password').label}
            />
            <Error errors={errors} name="password" />
          </div>
          <button className={styles.login_btn} type="submit">
            Log in
          </button>
        </form>
        <div>
          <p className={styles.text}>Don&apos;t have an account yet?</p>
          <p className={styles.button_registration}>
            <Link to="/registration">Sign up now</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
