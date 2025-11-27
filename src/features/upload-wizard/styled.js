import { styled } from '@mui/material/styles';
import { Box, Card, Stack, CardContent } from '@mui/material';

export const WizardRoot = styled(Box)(({ theme }) => ({
  maxWidth: 800,
  margin: `${theme.spacing(4)} auto ${theme.spacing(6)}`,
}));

export const ContentCard = styled(Card)(() => ({
  backgroundColor: 'transparent',
}));

export const ContentInner = styled(CardContent)(() => ({}));

export const DragContentInner = styled(Box)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  border: `2px dashed ${theme.palette.divider}`,
  textAlign: 'center',
  cursor: 'pointer',
  backgroundColor: theme.palette.background.default,
  position: 'relative',
  minHeight: 145,
  transition: 'background-color 0.15s ease, border 0.15s ease',
  '&[data-dragging="true"]': {
    backgroundColor: theme.palette.action.hover,
  },
}));

export const NavRow = styled(Stack)(({ theme }) => ({
  marginTop: theme.spacing(3),
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
}));
