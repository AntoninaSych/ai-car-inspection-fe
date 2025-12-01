import { Box, Stack, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../../../design-system';
import { ROUTERS } from '../../../../constants';
import { selectIsAuthorized } from '../../../../redux/auth/selectors';
import { openModal } from '../../../../redux/modal/slice';

const Hero = () => {
  const dispatch = useDispatch();
  const isAuthorized = useSelector(selectIsAuthorized);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleOnClick = () => {
    if (!isAuthorized) {
      dispatch(openModal({ type: 'auth' }));
      return;
    }
    navigate(ROUTERS.UPLOAD);
  };

  return (
    <Box component="section" sx={{ backgroundColor: theme => theme.palette.background.secondary }}>
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Stack gap={1} alignItems="center">
          <Typography variant="h1" align="center">
            {t('title')}
          </Typography>
          <Typography align="center">{t('description')}</Typography>
        </Stack>
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button onClick={handleOnClick}>{t('buttons.upload_photo')}</Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;
