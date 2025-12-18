import { useState } from 'react';
import { Typography } from '@mui/material';
import { Trans } from 'react-i18next';
import { Link } from '../../../../design-system';
import { LoginFormModal } from '../LoginFormModal';
import { RegisterFormModal } from '../RegisterFormModal';

export const AuthModal = ({ onClose, defaultMode = 'login' }) => {
  const [mode, setMode] = useState(defaultMode);

  switch (mode) {
    case 'login': {
      return (
        <LoginFormModal
          open={mode === 'login'}
          onClose={onClose}
          footer={
            <Typography variant="body1" textAlign="center" color="textSecondary" sx={{ mt: 2 }}>
              <Trans i18nKey="modals.login.footer">
                Do not have an account? <Link onClick={() => setMode('register')}>Sign up</Link>
              </Trans>
            </Typography>
          }
        />
      );
    }
    case 'register': {
      return (
        <RegisterFormModal
          open={mode === 'register'}
          onClose={onClose}
          footer={
            <Typography variant="body1" textAlign="center" color="textSecondary" sx={{ mt: 2 }}>
              <Trans i18nKey="modals.register.footer">
                Already have an account? <Link onClick={() => setMode('login')}>Sign in</Link>
              </Trans>
            </Typography>
          }
        />
      );
    }
    default:
      return null;
  }
};

export default AuthModal;
