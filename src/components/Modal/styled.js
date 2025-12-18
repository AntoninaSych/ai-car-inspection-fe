import { styled } from '@mui/material/styles';
import { Box, Dialog, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export const StyledModal = styled(Box)(({ theme }) => ({
  overflowY: 'auto',
  background: theme.palette.background.paper,
  border: `1px ${theme.palette.divider}`,
  // borderRadius: '16px',
  outline: 'none',

  [theme.breakpoints.up('md')]: {
    maxWidth: '576px',
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
