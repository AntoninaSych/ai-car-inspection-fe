import { styled } from '@mui/material/styles';
import { FaX } from 'react-icons/fa6';
import { Box, Dialog } from '@mui/material';

export const Overlay = styled(Dialog)(({ theme }) => ({
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
  borderRadius: '30px',
  padding: '20px 0 60px 0',
  outline: 'none',

  [theme.breakpoints.up('md')]: {
    maxWidth: '561px',
    padding: '20px 0 80px 0',
  },
}));

export const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  padding: '0 20px',
  marginBottom: '16px',

  color: theme.palette.text.secondary,

  [theme.breakpoints.up('md')]: {
    mt: '36px',
  },
}));

export const Content = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '0 20px',

  [theme.breakpoints.up('md')]: {
    padding: '0 40px',
  },
}));

export const StyledIcon = styled(FaX)(({ theme }) => ({
  cursor: 'pointer',
  marginLeft: 'auto',
  fontSize: '16px',

  [theme.breakpoints.up('md')]: {
    fontSize: '21px',
  },
}));
