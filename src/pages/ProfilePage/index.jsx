import { Container, Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Profile } from '../../features';

const ProfilePag = () => {
  const { t } = useTranslation('profile');

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Typography variant="h1" align="center">
        {t('title')}
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Profile />
      </Box>
    </Container>
  );
};

export default ProfilePag;
