import { Container, List, ListItem, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Hero from './components/Hero';

const HomePage = () => {
  const { t } = useTranslation('howItWorks');
  const steps = t('steps', { returnObjects: true });

  return (
    <>
      <Hero />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography sx={{ mb: 4 }}>{t('description')}</Typography>
        <Typography variant="h3" sx={{ mb: 2 }}>
          {t('title')}
        </Typography>
        <List component="ol" sx={{ listStyle: 'decimal', pl: 2, mb: 3 }}>
          {steps &&
            steps.map((step, index) => (
              <ListItem key={index} sx={{ display: 'list-item' }}>
                {step}
              </ListItem>
            ))}
        </List>
        <strong>{t('footer')}</strong>
      </Container>
    </>
  );
};
export default HomePage;
