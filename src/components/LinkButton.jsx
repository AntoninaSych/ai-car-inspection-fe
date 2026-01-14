import { Button } from '@mui/material';

export const LinkButton = ({ children, onClick, size = 'small', variant = 'text' }) => {
  return (
    <Button
      variant={variant}
      size={size}
      onClick={onClick}
      sx={{
        p: 0,
        minWidth: 'auto',
        textTransform: 'none',
        '&:hover': {
          textDecoration: 'underline',
          backgroundColor: 'transparent',
        },
      }}
    >
      {children}
    </Button>
  );
};
