import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import { useTranslation } from 'react-i18next';
import { RegisterForm, Modal } from '../../../../components';

export const RegisterFormModal = ({ onClose, open = true }) => {
  const { t } = useTranslation();

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={t('modals.register.title')}
      subtitle={t('modals.register.subtitle')}
      icon={<AutoAwesomeOutlinedIcon />}
    >
      <RegisterForm onSuccess={onClose} />
    </Modal>
  );
};
