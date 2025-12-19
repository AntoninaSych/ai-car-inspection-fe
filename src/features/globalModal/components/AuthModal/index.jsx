import { useState } from 'react';
import { Typography, Button } from '@mui/material';
import { Trans } from 'react-i18next';
import { LoginFormModal } from '../LoginFormModal';
import { RegisterFormModal } from '../RegisterFormModal';

const LinkButton = ({ children, onClick }) => {
  return (
    <Button
      variant="text"
      size="small"
      onClick={onClick}
      sx={{
        p: 0,
        minWidth: 'auto',
        textTransform: 'none',
        '&:hover': {
          textDecoration: 'underline',
          backgroundColor: 'transparent',
        },
      }}
    >
      {children}
    </Button>
  );
};

export const AuthModal = ({ onClose, defaultMode = 'login' }) => {
  const [mode, setMode] = useState(defaultMode);

  switch (mode) {
    case 'login': {
      return (
        <LoginFormModal
          open={mode === 'login'}
          onClose={onClose}
          footer={
            <Typography variant="body2" textAlign="center" color="text.secondary" sx={{ mt: 2 }}>
              <Trans i18nKey="modals.login.footer">
                Do not have an account?&html;
                <LinkButton onClick={() => setMode('register')}>Sign up</LinkButton>
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
            <Typography variant="body2" textAlign="center" color="text.secondary" sx={{ mt: 2 }}>
              <Trans i18nKey="modals.register.footer">
                Already have an account?&html;
                <LinkButton onClick={() => setMode('login')}>Sign in</LinkButton>
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
