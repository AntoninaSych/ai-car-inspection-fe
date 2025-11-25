import { styled } from '@mui/material/styles';
import { Box, Card, CardContent, Stack } from '@mui/material';

export const WizardRoot = styled(Box)(({ theme }) => ({
  maxWidth: 800,
  margin: `${theme.spacing(4)} auto ${theme.spacing(6)}`,
}));

export const ContentCard = styled(Card)(() => ({
  backgroundColor: 'transparent',
}));

export const ContentInner = styled(CardContent)(({ theme }) => ({
  minHeight: 260,
  position: 'relative',
  transition: 'background-color 0.15s ease, border 0.15s ease',
  '&[data-dragging="true"]': {
    backgroundColor: theme.palette.action.hover,
    border: `2px dashed ${theme.palette.primary.main}`,
  },
}));

export const DragOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  inset: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  border: `2px dashed ${theme.palette.primary.main}`,
  backgroundColor: theme.palette.background.paper,
  opacity: 0.9,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  pointerEvents: 'none', // щоб drop спрацьовував на контейнер
  zIndex: 1,
}));

export const NavRow = styled(Stack)(({ theme }) => ({
  marginTop: theme.spacing(3),
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
}));
