import { ConfigProvider, DatePicker } from 'antd';
import { Control, Controller } from 'react-hook-form';
import styles from './FormDateInputProfile.module.scss';
import {
  changeDateView,
  checkDateValidity,
} from '../../../autentification/utils/utils';
import { IRegistrationData } from '../../../../types/types';

// eslint-disable-next-line max-lines-per-function
export function FormDateInputProfile(props: {
  control: Control<IRegistrationData>;
  value: string | undefined;
}): React.ReactElement {
  const { control, value } = props;

  const validDate: string = changeDateView(value);
  return (
    <>
      <div className={styles.label}>Date of Birth</div>
      <Controller
        name="birthDate"
        defaultValue={value}
        control={control}
        rules={{ validate: { checkDateValidity } }}
        render={({ field: { onChange } }): React.ReactElement => {
          return (
            <ConfigProvider
              theme={{
                token: {
                  colorBorder: '#808080',
                  fontSize: 16,
                },
                components: {
                  DatePicker: {
                    activeBorderColor: '#64e44c',
                    hoverBorderColor: 'none',
                    paddingInline: 5,
                  },
                },
              }}
            >
              <DatePicker
                allowClear={false}
                suffixIcon={null}
                className={styles.ant_picker}
                placeholder={validDate}
                format="DD-MM-YYYY"
                onChange={onChange}
              />
            </ConfigProvider>
          );
        }}
      />
    </>
  );
}
