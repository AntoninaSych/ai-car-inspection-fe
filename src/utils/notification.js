import { toast } from 'react-hot-toast';
import i18n from '../i18n';
import { INTERNAL_CODE_MAP } from './errorCodes';

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

const getErrorDetails = error => {
  const data = error && error.response && error.response.data;
  const internalCode = data && data.internalCode;

  return { data, internalCode };
};

export const globalErrorHandler = (error, { t }) => {
  const translate = t || i18n.t.bind(i18n);
  const { internalCode } = getErrorDetails(error);

  if (internalCode && INTERNAL_CODE_MAP[internalCode]) {
    errorNotification(translate(INTERNAL_CODE_MAP[internalCode]));
  }
};

export const errorHandler = (error, defaultMessage = '') => {
  const { data, internalCode } = getErrorDetails(error);
  const translate = i18n.t.bind(i18n);
  let message = '';

  // skip internalCode, used in globalErrorHandler
  if (!internalCode) {
    if (defaultMessage) {
      message = defaultMessage;
    } else if (data && data.message) {
      // message from api
      message = data.message;
    } else if (error && error.message) {
      // common JS error
      message = error.message;
    } else {
      message = translate('errors.unknown');
    }

    if (message) {
      errorNotification(message);
    }
  }
};
