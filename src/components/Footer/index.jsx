import { Container } from '@mui/material';
import { Copyright } from './components';
import { Divider, Wrapper } from './styled';

export const Footer = () => {
  return (
    <footer>
      <Divider />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Wrapper>
          <Copyright />
        </Wrapper>
      </Container>
    </footer>
  );
};
