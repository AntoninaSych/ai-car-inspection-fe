import { styled } from '@mui/material/styles';

export const Divider = styled('hr')(({ theme }) => ({
  height: '1px',
  border: 'none',
  borderBottom: `1px solid ${theme.palette.divider}`,
  margin: '40px 0',
}));
