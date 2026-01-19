import { useEffect, useMemo, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container, Stack, Typography, Button, CircularProgress } from '@mui/material';
import { directAccess } from '../../api/authApi';
import { useDispatch, useSelector } from 'react-redux';
import { setSession } from '../../../../redux/auth/slice';
import { ROUTERS } from '../../../../constants';
import { openModal } from '../../../globalModal/slice';
import { selectIsAuthorized } from '../../../../redux/auth/selectors';

const mapReasonToKey = reason => {
  switch (reason) {
    case 'expired':
      return 'directAccess.errors.expired';
    case 'used':
      return 'directAccess.errors.used';
    case 'invalid':
    default:
      return 'directAccess.errors.invalid';
  }
};

export const DirectAccessPage = () => {
  const { t } = useTranslation('auth');
  const isAuthorized = useSelector(selectIsAuthorized);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useMemo(() => searchParams.get('token'), [searchParams]);
  const [status, setStatus] = useState('loading');
  const [responseData, setResponseData] = useState(null);
  const [errorKey, setErrorKey] = useState(null);

  useEffect(() => {
    const run = async () => {
      if (!token) {
        setStatus('error');
        setErrorKey('directAccess.errors.missingToken');
        return;
      }

      try {
        const res = await directAccess(token);
        const { token: accessToken, user, ...rest } = res;

        if (rest?.valid) {
          dispatch(setSession({ token: accessToken, user }));
          setResponseData(rest);
          setStatus('success');
          return;
        }

        const key = mapReasonToKey(res?.reason);
        setStatus('error');
        setErrorKey(key);
      } catch (error) {
        console.log(error);
        setStatus('error');
        setErrorKey('directAccess.errors.server');
      }
    };

    run();
  }, [token, dispatch, navigate]);

  useEffect(() => {
    if (!isAuthorized || !responseData) {
      return;
    }

    if (responseData.reportId) {
      navigate(`${ROUTERS.REPORTS}/${responseData.reportId}`, { replace: true });
    }
  }, [responseData, isAuthorized, navigate]);

  const goToLogin = () => {
    dispatch(openModal({ type: 'login' }));
  };

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 6, md: 10 } }}>
      <Stack spacing={2.5} alignItems="center" textAlign="center">
        <Typography variant="h3" sx={{ fontWeight: 800 }}>
          {status === 'loading' ? t('directAccess.loading.title') : t('directAccess.title')}
        </Typography>

        {status === 'loading' && (
          <>
            <Typography sx={{ color: 'text.secondary' }}>{t('directAccess.loading.subtitle')}</Typography>
            <CircularProgress />
          </>
        )}

        {status === 'error' && (
          <>
            <Typography sx={{ color: 'text.secondary' }}>{t(errorKey ?? 'directAccess.errors.invalid')}</Typography>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mt: 1 }}>
              <Button variant="contained" onClick={goToLogin}>
                {t('directAccess.actions.goToLogin')}
              </Button>
              <Button variant="text" onClick={() => navigate(ROUTERS.HOME, { replace: true })}>
                {t('directAccess.actions.goHome')}
              </Button>
            </Stack>
          </>
        )}
      </Stack>
    </Container>
  );
};

export default DirectAccessPage;
