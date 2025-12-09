import { styled } from '@mui/material/styles';
import { Accordion } from '@mui/material';

export const StyledAccordion = styled(Accordion)(({ theme }) => ({
  backgroundColor: 'transparent',
  borderRadius: theme.shape.borderRadius * 2,
  '&:before': { display: 'none' },
  '& .MuiCardContent-root': {
    border: 'none',
  },
}));
