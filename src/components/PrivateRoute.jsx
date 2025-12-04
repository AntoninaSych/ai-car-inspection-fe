import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { selectIsAuthorized, selectIsRefreshing } from '../redux/auth/selectors';
import { ROUTERS } from '../constants';
import { Loader } from './Loader';

export const PrivateRoute = () => {
  const isAuthorized = useSelector(selectIsAuthorized);
  const isRefreshing = useSelector(selectIsRefreshing);

  if (isRefreshing) {
    return <Loader />;
  }

  return isAuthorized ? <Outlet /> : <Navigate to={ROUTERS.HOME} replace />;
};
