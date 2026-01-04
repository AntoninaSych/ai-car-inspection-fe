import { Button } from '@mui/material';

export const SubmitButton = ({ disabled, loading, children, ...props }) => {
  return (
    <Button size="medium" type="submit" loading={loading} disabled={disabled} {...props}>
      {children}
    </Button>
  );
};
