import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { selectIsAuthorized } from '../../redux/auth/selectors';
import { openModal } from '../../redux/modal/slice';
import { ROUTERS } from '../../constants';

export const GetStarted = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isAuthorized = useSelector(selectIsAuthorized);

  const handleOnClick = () => {
    if (!isAuthorized) {
      dispatch(openModal({ type: 'auth' }));
      return;
    }
    navigate(ROUTERS.UPLOAD);
  };

  return (
    <Button
      variant="contained"
      onClick={handleOnClick}
      sx={{
        textTransform: 'none',
        px: 2,
        py: 1,
        borderRadius: 999,
        fontSize: 14,
        background: 'linear-gradient(110deg, #2F66FF 0%, #7B2BFF 100%)',
        // boxShadow: '0 14px 30px rgba(55, 79, 255, 0.25)',
        '&:hover': {
          background: 'linear-gradient(110deg, #2A5CF2 0%, #6E26F0 100%)',
          // boxShadow: '0 18px 38px rgba(55, 79, 255, 0.28)',
        },

        '&:active': {
          transform: 'translateY(1px)',
          // boxShadow: '0 10px 24px rgba(55, 79, 255, 0.22)',
        },
      }}
      disableElevation
    >
      {t('buttons.getStarted')}
    </Button>
  );
};
