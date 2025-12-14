import { styled } from '@mui/material/styles';

export const NavWrapper = styled('nav')(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(3),
  fontSize: '16px',

  '& a': {
    textDecoration: 'none',
    color: theme.palette.primary.main,
    opacity: 0.7,
    fontWeight: 600,
  },

  '& a:hover': {
    color: theme.palette.primary.dark,
  },

  '& a.active': {
    color: theme.palette.primary.main,
    opacity: 1,
    // fontWeight: 700,
    borderBottom: `2px solid ${theme.palette.primary.main}`,
  },
}));
