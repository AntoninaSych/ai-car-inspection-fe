import { Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { UploadWizard } from '../../features';

const UploadPage = () => {
  const { t } = useTranslation();

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Typography variant="h1" align="center">
        {t('upload-page.title')}
      </Typography>
      <UploadWizard />
    </Container>
  );
};

export default UploadPage;
