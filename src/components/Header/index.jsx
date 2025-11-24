import { Container, Toolbar, Box } from '@mui/material';
import { Nav, Brand } from './components';
import { LanguageSwitcher } from '../../features';
import { StyledAppBar } from './styled';

export const Header = () => {
  return (
    <StyledAppBar position="fixed" elevation={1}>
      <Container maxWidth="lg">
        <Toolbar>
          <Brand />
          <Box sx={{ flexGrow: 1 }} />
          <Nav />
          <LanguageSwitcher />
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
};
