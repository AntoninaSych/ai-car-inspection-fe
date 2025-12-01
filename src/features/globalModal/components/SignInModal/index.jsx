import { Typography } from '@mui/material';
import { SignInForm, Modal } from '../../../../components';
import { useTranslation } from 'react-i18next';

const SignInModal = ({ onClose }) => {
  const { t } = useTranslation();
  return (
    <Modal open={true} onClose={onClose}>
      <Typography variant="h3" color="textSecondary" sx={{ mb: 2 }}>
        {t('modals.login.title')}
      </Typography>
      <SignInForm onSuccess={onClose} />
    </Modal>
  );
};

export default SignInModal;
