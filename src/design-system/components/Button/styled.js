import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

export const StyledButton = styled(Button)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

export const StyledLink = styled('a')``;
