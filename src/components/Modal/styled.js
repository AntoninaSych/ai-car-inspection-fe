import { styled } from '@mui/material/styles';
import { Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export const Header = styled(Box)(() => ({
  position: 'relative',
  padding: '24px 32px',
  color: '#FFFFFF',
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

export const StyledIconButton = styled(IconButton)(() => ({
  position: 'absolute',
  cursor: 'pointer',
  top: '12px',
  right: '12px',
  color: '#FFFFFF',
  opacity: 0.6,

  '&:hover': {
    opacity: 1,
  },
}));
