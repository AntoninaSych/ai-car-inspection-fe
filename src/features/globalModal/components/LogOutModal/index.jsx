import { useDispatch } from 'react-redux';
import { Stack, Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useTranslation } from 'react-i18next';
import { Modal } from '../../../../components';
import { logout } from '../../../../redux/auth/operations';

const LogOutModal = ({ onClose }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleOnClick = () => {
    dispatch(logout());
    onClose();
  };

  return (
    <Modal
      open={true}
      onClose={onClose}
      icon={<LogoutIcon />}
      title={t('modals.logout.title')}
      subtitle={t('modals.logout.description')}
    >
      <Stack gap={2} width="100%" justifyContent="stretch">
        <Button fullWidth size="medium" onClick={onClose}>
          {t('buttons.cancel', 'Cancel')}
        </Button>
        <Button fullWidth variant="outlined" size="medium" onClick={handleOnClick}>
          {t('buttons.logout', 'Log Out')}
        </Button>
      </Stack>
    </Modal>
  );
};

export default LogOutModal;
