import { SignUpForm, Modal } from '../../../../components';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const SignUpModal = ({ onClose }) => {
  const { t } = useTranslation();

  return (
    <Modal open={true} onClose={onClose}>
      <Typography variant="h3" color="textSecondary" sx={{ mb: 2 }}>
        {t('modals.register.title')}
      </Typography>
      <SignUpForm onSuccess={onClose} />
    </Modal>
  );
};

export default SignUpModal;
