import { ROUTERS } from '../../../../constants';
import { NavLink } from 'react-router-dom';
import { NavWrapper } from './styled';

export const Nav = () => {
  return (
    <NavWrapper>
      <NavLink to={ROUTERS.HOME}>Home</NavLink>
      <NavLink to={ROUTERS.UPLOAD}>Upload Photo</NavLink>
    </NavWrapper>
  );
};
