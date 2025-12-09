import { Container, Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { UploadWizard } from '../../features';

const UploadPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Typography variant="h1" align="center">
          {t('upload-page.title')}
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
          {t('upload-page.subtitle')}
        </Typography>
      </Container>
      <Container>
        <Box sx={{ mt: 4 }}>
          <UploadWizard />
        </Box>
      </Container>
    </>
  );
};

export default UploadPage;
