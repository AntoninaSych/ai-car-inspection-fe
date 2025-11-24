import { toast } from 'react-hot-toast';

const defaultOptions = {
  position: 'bottom-right',
  duration: 3000,
};

export const successNotification = (message, options = {}) => {
  toast.success(message, { ...defaultOptions, ...options });
};

export const errorNotification = (message, options = {}) => {
  toast.error(message, { ...defaultOptions, ...options });
};

export const errorHandler = (error, text = '') => {
  const message =
    text || error.response?.data?.message || error.message || 'Error';
  errorNotification(message);
};
