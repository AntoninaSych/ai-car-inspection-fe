import { styled } from '@mui/material/styles';
import { Box, Dialog, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export const Overlay = styled(Dialog)(() => ({
  position: 'fixed',
  zIndex: 999,
  backgroundColor: 'rgba(18, 20, 23, 0.8)',
  animation: `fade 250ms cubic-bezier(0.4, 0, 0.2, 1)`,
  top: '0',
  left: '0',
  right: '0',
  bottom: '0',
}));

export const StyledModal = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: '375px',
  width: '100%',
  overflowY: 'auto',
  background: theme.palette.background.paper,
  border: `1px ${theme.palette.divider}`,
  borderRadius: '16px',
  padding: '0 0 24px 0',
  outline: 'none',

  [theme.breakpoints.up('md')]: {
    maxWidth: '561px',
  },
}));

export const Header = styled(Box)(({ theme }) => ({
  position: 'relative',
  padding: '24px 32px',
  py: 2,
  color: theme.palette.common.white,
  background: 'linear-gradient(90deg, #2B6AF6 0%, #7C2CF3 70%, #A12AF0 100%)',
}));

export const Content = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '24px 32px',
}));

export const StyledIcon = styled(CloseIcon)(() => ({
  fontSize: '21px',
}));

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  cursor: 'pointer',
  top: '12px',
  right: '12px',
  color: theme.palette.common.white,
  opacity: 0.8,

  '&:hover': {
    opacity: 1,
  },
}));
