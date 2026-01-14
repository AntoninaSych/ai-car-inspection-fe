import { useDispatch, useSelector } from 'react-redux';
import { RegisterFormModal, LoginFormModal, AuthModal, LogOutModal, ForgotPasswordModal } from './components';
import { selectGlobalModal } from './selectors';
import { closeModal } from './slice';

export const GlobalModal = () => {
  const dispatch = useDispatch();
  const { type, props } = useSelector(selectGlobalModal);

  const handleOnClose = () => {
    dispatch(closeModal());
  };

  switch (type) {
    case 'auth':
      return <AuthModal onClose={handleOnClose} {...props} />;
    case 'login':
      return <LoginFormModal onClose={handleOnClose} {...props} />;
    case 'register':
      return <RegisterFormModal onClose={handleOnClose} {...props} />;
    case 'logout':
      return <LogOutModal onClose={handleOnClose} {...props} />;
    case 'forgot-password':
      return <ForgotPasswordModal onClose={handleOnClose} {...props} />;
    default:
      return null;
  }
};
