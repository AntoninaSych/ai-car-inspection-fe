import { Button } from '@mui/material';

export const SubmitButton = ({ disabled, loading, children, size = 'medium', ...props }) => {
  return (
    <Button size={size} type="submit" loading={loading} disabled={disabled} {...props}>
      {children}
    </Button>
  );
};
