import { Container, Typography } from '@mui/material';
import { Hero } from './components';

const UploadPage = () => {
  return (
    <>
      <Container maxWidth="lg" sx={{ py: 2 }}>
        <Typography variant="h1" align="center" sx={{ pb: 2 }}>
          Upload Page
        </Typography>
      </Container>
      <Hero />
    </>
  );
};

export default UploadPage;
