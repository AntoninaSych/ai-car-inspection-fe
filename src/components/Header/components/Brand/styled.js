import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

export const StyledLink = styled(Link)(({ theme }) => ({
  fontWeight: 800,
  fontSize: '16px',
  textDecoration: 'none',
  // textTransform: 'uppercase',
  color: theme.palette.primary.main,
}));
