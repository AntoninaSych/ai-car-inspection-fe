import { Container, List, ListItem, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Hero } from './components';
import { openModal } from '../../redux/modal/slice';
import { ROUTERS } from '../../constants';
import { selectIsAuthorized } from '../../redux/auth/selectors';
import heroMock1x from '@/assets/hero/hero-mock.png';
import heroMock2x from '@/assets/hero/hero-mock@2x.png';

const HomePage = () => {
  const { t } = useTranslation('howItWorks');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthorized = useSelector(selectIsAuthorized);
  const steps = t('steps', { returnObjects: true });

  const handleOnClick = () => {
    if (!isAuthorized) {
      dispatch(openModal({ type: 'auth' }));
      return;
    }
    navigate(ROUTERS.UPLOAD);
  };

  return (
    <>
      <Hero heroMock1x={heroMock1x} heroMock2x={heroMock2x} onUploadClick={handleOnClick} />
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
