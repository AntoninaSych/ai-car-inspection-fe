import { Typography, Stack, Dialog } from '@mui/material';
import { Header, Content, StyledIconButton, StyledIcon } from './styled';

export const Modal = ({ children, open, onClose, icon, title, subtitle }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll="paper"
      maxWidth="sm"
      slotProps={{
        paper: {
          sx: {
            width: '100%',
            borderRadius: 2,
            maxHeight: '90vh',
          },
        },
      }}
    >
      <>
        <Header>
          {!!onClose && (
            <StyledIconButton onClick={onClose}>
              <StyledIcon />
            </StyledIconButton>
          )}

          <Stack alignItems="flex-start" spacing={0.5}>
            {(icon || title) && (
              <Stack direction="row" alignItems="center" gap={0.5}>
                {icon && <>{icon}</>}
                {title && (
                  <Typography variant="h3" fontWeight={400}>
                    {title}
                  </Typography>
                )}
              </Stack>
            )}

            {subtitle && <Typography sx={{ mt: 0.5, fontSize: 14 }}>{subtitle}</Typography>}
          </Stack>
        </Header>
        <Content>{children}</Content>
      </>
    </Dialog>
  );
};
