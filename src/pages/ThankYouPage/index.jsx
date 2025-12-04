import { useLocation } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const ThankYouPage = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const isFromPayment = location.state?.from === 'payment';

  return (
    <Container maxWidth="sm">
      <Typography variant="h3" mt={6} gutterBottom>
        {t('thankYou:title', 'Дякуємо!')}
      </Typography>

      {isFromPayment ? (
        <Typography variant="body1" color="text.secondary">
          {t(
            'thankYou:paymentSuccess',
            'Оплату успішно прийнято. Очікуйте, будь ласка, електронного листа з деталями оцінки та подальшими кроками.'
          )}
        </Typography>
      ) : (
        <Typography variant="body1" color="text.secondary">
          {t('thankYou:generic', 'Дякуємо за використання сервісу. Ми скоро зв’яжемося з вами на email.')}
        </Typography>
      )}
    </Container>
  );
};

export default ThankYouPage;
