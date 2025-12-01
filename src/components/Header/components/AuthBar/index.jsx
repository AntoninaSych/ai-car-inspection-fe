import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Link } from '../../../../design-system';
import { openModal } from '../../../../redux/modal/slice';
import { NavWrapper } from './styled';

export const AuthBar = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleOnClick = type => () => {
    dispatch(openModal({ type }));
  };

  return (
    <NavWrapper>
      <Link onClick={handleOnClick('login')}>{t('buttons.login', 'Sign In')}</Link>
      <Link onClick={handleOnClick('register')}>{t('buttons.register', 'Sign Up')}</Link>
    </NavWrapper>
  );
};
