import { useState } from 'react';
import { Typography, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Trans, useTranslation } from 'react-i18next';
import { LoginFormModal } from '../LoginFormModal';
import { RegisterFormModal } from '../RegisterFormModal';
import { closeModal } from '../../slice';
import { ROUTERS } from '../../../../constants';

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
  const dispatch = useDispatch();
  const { t } = useTranslation(['common', 'auth']);
  const navigate = useNavigate();

  const handleOnForgotPasswordClick = () => {
    dispatch(closeModal());
    navigate(ROUTERS.FORGOT_PASSWORD);
  };

  switch (mode) {
    case 'login': {
      return (
        <LoginFormModal
          open={mode === 'login'}
          onClose={onClose}
          footer={
            <Stack gap={1} sx={{ mt: 2 }}>
              <LinkButton onClick={handleOnForgotPasswordClick}>{t('auth:login.forgotPassword')}</LinkButton>
              <Typography variant="body2" textAlign="center" color="text.secondary">
                <Trans i18nKey="common:modals.login.footer">
                  Do not have an account?&html;
                  <LinkButton onClick={() => setMode('register')}>Sign up</LinkButton>
                </Trans>
              </Typography>
            </Stack>
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
              <Trans i18nKey="common:modals.register.footer">
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
