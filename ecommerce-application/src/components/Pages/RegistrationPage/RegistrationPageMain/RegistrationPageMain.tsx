// import { SubmitHandler, useForm } from 'react-hook-form';
// import { ServiceInputParameters } from '../../../../services/inputService';
// import { IRegistrationData } from '../../../../types/types';
// import { FormInput } from '../../../UI/FormInput/FormInput';
// import { Error } from '../../../common/Error/Error';
// import styles from './RegistrationPageMain.module.scss';

// // eslint-disable-next-line max-lines-per-function
// export function RegistrationPageMain(): React.ReactElement {
//   const {
//     register,
//     formState: { errors },
//     handleSubmit,
//   } = useForm<IRegistrationData>({
//     mode: 'onChange',
//     // criteriaMode: 'firstError',
//     // criteriaMode: 'all',
//   });
//   const onSubmit: SubmitHandler<IRegistrationData> = (
//     data: IRegistrationData,
//   ): void => {
//     console.log('RESULT', data);
//   };
//   const inputService = new ServiceInputParameters(register);

//   return (
//     <main className={styles.main_block}>
//       <div className={styles.wrapper}>
//         <h2 className={styles.title}>Register</h2>
//         <form onSubmit={handleSubmit(onSubmit)} noValidate>
//           <FormInput {...inputService.createInputParams('email')} />
//           <Error errors={errors} name="email" />
//           <FormInput {...inputService.createInputParams('password')} />
//           <Error errors={errors} name="password" />

//           {/* {InputService.createEmailInput(register, errors)}
//           {InputService.createPasswordInput(register, errors)}
//           {InputService.createTextInput(register, errors, 'userFirstName')}
//           {InputService.createTextInput(register, errors, 'userSecondName')}
//           {InputService.createDateInput(register, errors)}
//           {InputService.createTextInput(register, errors, 'street')}
//           {InputService.createTextInput(register, errors, 'city')}
//           {InputService.createTextInput(register, errors, 'country')}
//           {InputService.createTextInput(register, errors, 'postalCode')} */}
//           <button className={styles.submit_button} type="submit">
//             Sign up
//           </button>
//         </form>
//         <div className={styles.container}>
//           <p className={styles.text}>Already have an account?</p>
//           <button className={styles.button_login} type="button">
//             Log in now
//           </button>
//         </div>
//       </div>
//     </main>
//   );
// }
