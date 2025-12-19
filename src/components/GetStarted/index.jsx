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
      size="small"
      onClick={handleOnClick}
      sx={{
        boxShadow: 'none',
        '&:hover': {
          boxShadow: 'none',
        },
      }}
      disableElevation
    >
      {t('buttons.getStarted')}
    </Button>
  );
};
