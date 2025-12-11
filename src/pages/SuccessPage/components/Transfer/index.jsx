import { Box, Button, Container, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ROUTERS } from '../../../../constants';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export const Transfer = () => {
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
          <Typography variant="h4" component="h2" gutterBottom>
            {t('success.transfer.title')}
          </Typography>
          <Typography variant="h6" component="h3" gutterBottom>
            {t('success.transfer.subtitle')}
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            {t('success.transfer.statusInfo')}
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            {t('success.transfer.emailInfo')}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mt: 2, width: '100%' }}>
          <Button variant="contained" fullWidth component={RouterLink} to={ROUTERS.PROFILE}>
            {t('button.goToProfile')}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
