import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { ButtonBase } from '@mui/material';
import { openModal } from '../../../../features/globalModal/slice';

export const AuthBar = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleOnClick = type => () => {
    dispatch(openModal({ type }));
  };

  return (
    <ButtonBase
      onClick={handleOnClick('auth')}
      sx={{
        px: 1,
        py: 0.5,
        borderRadius: 0.5,
        fontSize: { xs: 12, md: 14 },
        lineHeight: 1,
        color: '#45556C',
        backgroundColor: 'transparent',
        '&:hover': {
          backgroundColor: '#EFF6FF',
        },
      }}
    >
      {t('buttons.login', 'Sign In')}
    </ButtonBase>
  );
};
