import { Link } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import { Container, Typography } from '@mui/material';
import { ROUTERS } from '../../constants';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h1" align="center" sx={{ mb: 4 }}>
        {t('404.title')}
      </Typography>
      <Typography align="center">
        <Trans i18nKey="404.go_home" components={{ home: <Link to={ROUTERS.HOME} /> }} />
      </Typography>
    </Container>
  );
};

export default NotFoundPage;
