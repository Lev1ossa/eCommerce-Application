import { toast } from 'react-toastify';
import { ToastTypes } from '../../../types/types';
import { toastProps } from '../constants/constants';

export const showToast = (type: ToastTypes, message: string): void => {
  toast[type](message, toastProps);
};
