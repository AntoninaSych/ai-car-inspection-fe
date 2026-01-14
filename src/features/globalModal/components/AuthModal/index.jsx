import { useState } from 'react';
import LoginIcon from '@mui/icons-material/Login';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import { Typography, Stack } from '@mui/material';
import { Trans, useTranslation } from 'react-i18next';
import { LinkButton, LoginForm, Modal, RegisterForm, ForgotPasswordForm } from '../../../../components';
import KeyIcon from '@mui/icons-material/Key';

export const AuthModal = ({ onClose, defaultMode = 'login' }) => {
  const { t } = useTranslation();
  const [mode, setMode] = useState(defaultMode);

  switch (mode) {
    case 'login': {
      return (
        <Modal
          open={mode === 'login'}
          onClose={onClose}
          title={t('modals.login.title')}
          subtitle={t('modals.login.subtitle')}
          icon={<LoginIcon />}
        >
          <LoginForm onSuccess={onClose} onForgotPassword={() => setMode('forgot-password')} />
          <Stack gap={1} sx={{ mt: 2 }}>
            <Typography variant="body2" textAlign="center" color="text.secondary" sx={{ mt: 2 }}>
              <Trans i18nKey="common:modals.login.footer">
                Do not have an account?&html;
                <LinkButton onClick={() => setMode('register')}>Sign up</LinkButton>
              </Trans>
            </Typography>
          </Stack>
        </Modal>
      );
    }
    case 'register': {
      return (
        <Modal
          open={mode === 'register'}
          onClose={onClose}
          title={t('modals.register.title')}
          subtitle={t('modals.register.subtitle')}
          icon={<AutoAwesomeOutlinedIcon />}
        >
          <RegisterForm onSuccess={onClose} />
          <Typography variant="body2" textAlign="center" color="text.secondary" sx={{ mt: 2 }}>
            <Trans i18nKey="common:modals.register.footer">
              Already have an account?&html;
              <LinkButton onClick={() => setMode('login')}>Sign in</LinkButton>
            </Trans>
          </Typography>
        </Modal>
      );
    }
    case 'forgot-password': {
      return (
        <Modal
          open={mode === 'forgot-password'}
          onClose={onClose}
          title={t('modals.forgot-password.title')}
          subtitle={t('modals.forgot-password.subtitle')}
          icon={<KeyIcon />}
        >
          <ForgotPasswordForm />
          <Typography variant="body2" textAlign="center" color="text.secondary" sx={{ mt: 2 }}>
            <Trans i18nKey="common:modals.forgot-password.footer">
              Back to&html;
              <LinkButton onClick={() => setMode('login')}>Sign in</LinkButton>
            </Trans>
          </Typography>
        </Modal>
      );
    }
    default:
      return null;
  }
};

export default AuthModal;
