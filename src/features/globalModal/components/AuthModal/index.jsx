import { useState } from 'react';
import { Typography } from '@mui/material';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from '../../../../design-system';
import { Modal } from '../../../../components';
import { SignUpForm, SignInForm } from '../../../../components';

export const AuthModal = ({ onClose, defaultMode = 'login' }) => {
  const { t } = useTranslation();
  const [mode, setMode] = useState(defaultMode);

  const handleSwitchToLogin = () => setMode('login');
  const handleSwitchToRegister = () => setMode('register');

  return (
    <Modal open={true} onClose={onClose}>
      {mode === 'login' ? (
        <>
          <Typography variant="h3" color="textSecondary" sx={{ mb: 2 }}>
            {t('modals.login.title')}
          </Typography>
          <Typography color="textSecondary" sx={{ mb: 2 }}>
            {t('modals.login.description')}
          </Typography>

          <SignInForm onSuccess={onClose} />

          <Typography variant="body1" textAlign="center" color="textSecondary" sx={{ mt: 2 }}>
            <Trans i18nKey="modals.login.footer">
              Do not have an account? <Link onClick={handleSwitchToRegister}>Sign up</Link>
            </Trans>
          </Typography>
        </>
      ) : (
        <>
          <Typography variant="h3" color="textSecondary" sx={{ mb: 2 }}>
            {t('modals.register.title')}
          </Typography>
          <Typography color="textSecondary" sx={{ mb: 2 }}>
            {t('modals.register.description')}
          </Typography>

          <SignUpForm onSuccess={onClose} />

          <Typography variant="body1" textAlign="center" color="textSecondary" sx={{ mt: 2 }}>
            <Trans i18nKey="modals.register.footer">
              Already have an account? <Link onClick={handleSwitchToLogin}>Sign in</Link>
            </Trans>
          </Typography>
        </>
      )}
    </Modal>
  );
};

export default AuthModal;
