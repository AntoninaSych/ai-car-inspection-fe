import { Container, Box, Typography, Button } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ROUTERS } from '../../../../constants';

export const Payment = () => {
  const { t } = useTranslation('payment');

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 3,
        }}
      >
        <CheckCircleOutlineIcon sx={{ fontSize: 64 }} color="success" />

        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            {t('success.title')}
          </Typography>
          <Typography variant="h6" component="h2" gutterBottom>
            {t('success.subtitle')}
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            {t('success.statusInfo')}
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            {t('success.emailInfo')}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mt: 2, width: '100%' }}>
          <Button variant="contained" fullWidth component={RouterLink} to={ROUTERS.PROFILE}>
            {t('success.button.goToProfile')}
          </Button>

          <Button variant="text" fullWidth component={RouterLink} to={ROUTERS.HOME}>
            {t('success.button.backToHome')}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
