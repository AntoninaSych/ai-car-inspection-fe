import { styled } from '@mui/material/styles';
import { Box, Card, CardMedia, Stack } from '@mui/material';

export const WizardRoot = styled(Box)(({ theme }) => ({
  maxWidth: 800,
  margin: `${theme.spacing(4)} auto ${theme.spacing(6)}`,
}));

export const StyledCard = styled(Card)(() => ({
  backgroundColor: 'transparent',
}));

export const StyledCardMedia = styled(CardMedia)({
  objectFit: 'cover',
  height: 180,
});

export const StyledPreviewCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '100%',
  borderRadius: theme.shape.borderRadius * 2,
}));

export const NavRow = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(2),
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',

  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}));
