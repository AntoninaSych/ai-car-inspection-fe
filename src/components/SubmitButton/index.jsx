import { Button } from '@mui/material';

export const SubmitButton = ({ disabled, loading, children }) => {
  return (
    <Button variant="contained" size="medium" type="submit" loading={loading} disabled={disabled}>
      {children}
    </Button>
  );
};
