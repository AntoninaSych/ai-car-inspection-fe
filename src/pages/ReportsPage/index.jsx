import { Container, Box, Typography } from '@mui/material';
import { Reports } from '../../features';
import { useTranslation } from 'react-i18next';

const ReportsPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Typography variant="h1" align="center">
          {t('reports-page.title')}
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          {t('reports-page.subtitle')}
        </Typography>
      </Container>
      <Container>
        <Box sx={{ mt: 4 }}>
          <Reports />
        </Box>
      </Container>
    </>
  );
};

export default ReportsPage;
