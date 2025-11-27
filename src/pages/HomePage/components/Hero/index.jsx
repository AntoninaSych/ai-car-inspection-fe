import { Box, Stack, Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../../design-system/components';
import { ROUTERS } from '../../../../constants';

const Hero = () => {
  const { t } = useTranslation();

  return (
    <Box component="section" sx={{ backgroundColor: theme => theme.palette.background.secondary }}>
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Stack spacing={1} alignItems="center">
          <Typography variant="h1" align="center">
            {t('title')}
          </Typography>
          <Typography align="center">{t('description')}</Typography>
        </Stack>
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button to={ROUTERS.UPLOAD}>{t('buttons.upload_photo')}</Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;
