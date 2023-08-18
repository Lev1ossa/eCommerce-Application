import { SubmitHandler, useForm } from 'react-hook-form';
import { ServiceInputParameters } from '../../../../services/inputService';
import { ILoginData, IRegistrationData } from '../../../../types/types';
import { FormInput } from '../../../UI/FormInput/FormInput';
import { FormPasswordInput } from '../../../UI/FormPasswordInput/FormPasswordInput';
import { Error } from '../../../common/Error/Error';
import styles from './LoginPageMain.module.css';

export function LoginPageMain(): React.ReactElement {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IRegistrationData>({ mode: 'onChange' });
  const onSubmit: SubmitHandler<ILoginData> = (data: ILoginData): void => {
    console.log('RESULT', data);
  };
  const inputService = new ServiceInputParameters(register);

  return (
    <main className={styles.loginPage__main}>
      <div className={styles.container}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
          <button type="submit">Log in</button>
        </form>
        <p>Don&apos;t have an account yet?</p>
        <button type="button">Sign up now</button>
      </div>
    </main>
  );
}
