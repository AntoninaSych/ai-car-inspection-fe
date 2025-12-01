import { MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledMenuItem = styled(MenuItem)(() => ({
  '&:hover svg': {
    color: '#fff',
  },
  '&:hover .MuiListItemText-secondary': {
    color: '#fff',
  },
}));
