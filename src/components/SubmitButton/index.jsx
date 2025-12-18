import { Button } from '@mui/material';

export const SubmitButton = ({ disabled, loading, children }) => {
  return (
    <Button
      type="submit"
      loading={loading}
      disabled={disabled}
      sx={{
        mt: 0.5,
        height: 56,
        borderRadius: 3,
        fontSize: 18,
        fontWeight: 800,
        textTransform: 'none',
        color: 'common.white',
        background: 'linear-gradient(90deg, #2B6AF6 0%, #7C2CF3 70%, #A12AF0 100%)',
        boxShadow: '0 14px 30px rgba(47, 89, 246, 0.35)',
        '&:hover': {
          filter: 'brightness(1.02)',
        },
        '&.Mui-disabled': {
          color: 'rgba(255,255,255,0.75)',
          background:
            'linear-gradient(90deg, rgba(43,106,246,0.45) 0%, rgba(124,44,243,0.45) 70%, rgba(161,42,240,0.45) 100%)',
        },
      }}
    >
      {children}
    </Button>
  );
};
