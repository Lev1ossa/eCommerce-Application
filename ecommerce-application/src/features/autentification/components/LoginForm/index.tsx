import { useContext, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { ILoginData, IRegistrationData } from '../../../../types/types';
import { ServiceInputParameters } from '../../services/inputService';
import { handleLogin } from '../../utils/authHandlers';
import { Error } from '../FormInputs/Error/Error';
import { FormInput } from '../FormInputs/FormInput/FormInput';
import { FormPasswordInput } from '../FormInputs/FormPasswordInput/FormPasswordInput';
import styles from './LoginForm.module.scss';
import { isUserLoggedIn } from '../../../../api/tokenHandlers';
import { ApiRootContext } from '../../../../context/ApiRootContext';

// eslint-disable-next-line max-lines-per-function
export function LoginForm(): React.ReactElement {
  const refreshTokenFlowApiRoot = useContext(ApiRootContext);
  const navigate = useNavigate();
  const handleRedirect = (): void => {
    if (isUserLoggedIn()) {
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
    await handleLogin(loginData, refreshTokenFlowApiRoot).then(
      () => {},
      () => {},
    );
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
