import { StyledModal, Overlay, Header, Content, StyledIcon } from './styled';
import { ThemeProvider } from '@mui/material';
import { getTheme } from '../../design-system/theme/getTheme';

export const Modal = ({ children, open, onClose }) => {
  return (
    <Overlay open={open} onClose={onClose}>
      <StyledModal>
        <ThemeProvider theme={getTheme('light')}>
          <Header>
            <StyledIcon onClick={onClose} />
          </Header>
          <Content>{children}</Content>
        </ThemeProvider>
      </StyledModal>
    </Overlay>
  );
};
