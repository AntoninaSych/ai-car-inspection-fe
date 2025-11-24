import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { ROUTERS } from '../../../../constants';
import { NavWrapper } from './styled';

export const Nav = () => {
  const { t } = useTranslation();

  return (
    <NavWrapper>
      <NavLink to={ROUTERS.UPLOAD}>{t('nav.upload_photo')}</NavLink>
    </NavWrapper>
  );
};
