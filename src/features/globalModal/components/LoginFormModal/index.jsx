import LoginIcon from '@mui/icons-material/Login';
import { useTranslation } from 'react-i18next';
import { LoginForm, Modal } from '../../../../components';

export const LoginFormModal = ({ onClose, onForgotPassword, open = true }) => {
  const { t } = useTranslation();

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={t('modals.login.title')}
      subtitle={t('modals.login.subtitle')}
      icon={<LoginIcon />}
    >
      <LoginForm onSuccess={onClose} onForgotPassword={onForgotPassword} />
    </Modal>
  );
};
