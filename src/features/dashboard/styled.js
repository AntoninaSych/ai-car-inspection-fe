import { Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledPaper = styled(Paper)(({ theme, isgradient }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  ...(isgradient
    ? {
        border: 'none',
        color: theme.palette.common.white,
        background: 'linear-gradient(135deg, rgba(44,84,255,1), rgba(138,43,226,1))',
      }
    : { background: '#FFFFFF', borderColor: theme.palette.neutral[200], borderWidth: 2, borderStyle: 'solid' }),
}));
