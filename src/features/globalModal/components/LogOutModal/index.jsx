import { useDispatch } from 'react-redux';
import { Typography, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Modal } from '../../../../components';
import { Button } from '../../../../design-system';
import { logout } from '../../../../redux/auth/operations';

const LogOutModal = ({ onClose }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleOnClick = () => {
    dispatch(logout());
    onClose();
  };

  return (
    <Modal open={true} onClose={onClose}>
      <Typography variant="h3" color="textSecondary" sx={{ mb: 2 }}>
        {t('modals.logout.title', 'Log Out')}
      </Typography>
      <Typography color="textSecondary" sx={{ mb: 2 }}>
        {t('modals.logout.description', 'You can always log back in at my time.')}
      </Typography>
      <div>
        <Stack direction={{ sm: 'column', md: 'row' }} spacing={2}>
          <Button size="large" onClick={handleOnClick}>
            {t('buttons.logout', 'Log Out')}
          </Button>
          <Button size="large" onClick={onClose}>
            {t('buttons.cancel', 'Cancel')}
          </Button>
        </Stack>
      </div>
    </Modal>
  );
};

export default LogOutModal;
