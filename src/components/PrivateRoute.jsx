import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { selectIsAuthorized } from '../redux/auth/selectors';
import { ROUTERS } from '../constants';

export const PrivateRoute = () => {
  const isAuthorized = useSelector(selectIsAuthorized);

  return isAuthorized ? <Outlet /> : <Navigate to={ROUTERS.HOME} replace />;
};
