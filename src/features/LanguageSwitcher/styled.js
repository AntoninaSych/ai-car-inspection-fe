import { IconButton, Menu, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';

export const LanguageButton = styled(IconButton)(({ theme }) => ({
  paddingLeft: theme.spacing(1.5),
  paddingRight: theme.spacing(1.5),
  paddingTop: theme.spacing(0.5),
  paddingBottom: theme.spacing(0.5),
  borderRadius: 999,
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: 'transparent',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  color: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
    borderColor: theme.palette.primary.main,
    color: theme.palette.text.primary,
  },
}));

export const LanguageMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    marginTop: theme.spacing(1),
    borderRadius: theme.shape.borderRadius * 2,
    minWidth: 200,
    boxShadow: theme.shadows[4],
    border: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
  },
}));

export const LanguageMenuItem = styled(MenuItem)(({ theme }) => ({
  fontSize: 14,
  color: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: 'transparent',
    color: theme.palette.action.hover,
  },
  '&.Mui-selected': {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.text.primary,
    },
    '& .MuiListItemIcon-root': {
      color: theme.palette.primary.contrastText,
    },
  },
}));
