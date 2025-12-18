import { ThemeProvider, Box, Typography, Stack, Dialog } from '@mui/material';
import { StyledModal, Header, Content, StyledIconButton, StyledIcon } from './styled';
import { getTheme } from '../../design-system/theme/getTheme';

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
      <StyledModal>
        <ThemeProvider theme={getTheme('light')}>
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
                    <Typography variant="h5" fontWeight={400}>
                      {title}
                    </Typography>
                  )}
                </Stack>
              )}

              {subtitle && (
                <Box>
                  <Typography sx={{ mt: 0.5, opacity: 0.9, fontSize: 14 }}>{subtitle}</Typography>
                </Box>
              )}
            </Stack>
          </Header>
          <Content>{children}</Content>
        </ThemeProvider>
      </StyledModal>
    </Dialog>
  );
};
