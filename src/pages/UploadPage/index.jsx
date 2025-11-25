import { Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { UploadWizard } from '../../features';

const UploadPage = () => {
  const { t } = useTranslation();

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Typography variant="h1" align="center" sx={{ pb: 2 }}>
        {t('upload-page.title')}
      </Typography>
      <UploadWizard />
    </Container>
  );
};

export default UploadPage;
