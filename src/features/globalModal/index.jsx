import { useDispatch, useSelector } from 'react-redux';
import AuthModal from './components/AuthModal';
import SignInModal from './components/SignInModal';
import SignUpModal from './components/SignUpModal';
import LogOutModal from './components/LogOutModal';
import { selectGlobalModal } from '../../redux/modal/selectors';
import { closeModal } from '../../redux/modal/slice';

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
      return <SignInModal onClose={handleOnClose} {...props} />;
    case 'register':
      return <SignUpModal onClose={handleOnClose} {...props} />;
    case 'logout':
      return <LogOutModal onClose={handleOnClose} {...props} />;
    default:
      return null;
  }
};
