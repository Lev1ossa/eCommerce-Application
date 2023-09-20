import { ConfigProvider, DatePicker } from 'antd';
import { Control, Controller } from 'react-hook-form';
import styles from './FormDateInput.module.scss';
import { checkDateValidity } from '../../../utils/utils';
import { IRegistrationData } from '../../../../../types/types';

// eslint-disable-next-line max-lines-per-function
export function FormDateInput(props: {
  control: Control<IRegistrationData>;
}): React.ReactElement {
  const { control } = props;
  return (
    <>
      <div className={styles.label}>Date of Birth</div>
      <Controller
        name="birthDate"
        defaultValue="01.01.2023"
        control={control}
        rules={{ validate: { checkDateValidity } }}
        render={({ field: { onChange } }): React.ReactElement => {
          return (
            <ConfigProvider
              theme={{
                token: {
                  colorBorder: '#808080',
                  fontSize: 18,
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
                placeholder="dd-mm-yyyy"
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
