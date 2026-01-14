import KeyIcon from '@mui/icons-material/Key';
import { useTranslation } from 'react-i18next';
import { ForgotPasswordForm, Modal } from '../../../../components';

export const ForgotPasswordModal = ({ onClose, open = true }) => {
  const { t } = useTranslation();
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={t('modals.forgot-password.title')}
      subtitle={t('modals.forgot-password.subtitle')}
      icon={<KeyIcon />}
    >
      <ForgotPasswordForm />
    </Modal>
  );
};
