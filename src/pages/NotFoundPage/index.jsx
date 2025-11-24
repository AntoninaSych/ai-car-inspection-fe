import { Link } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import { ROUTERS } from '../../constants';

const NotFoundPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h1" align="center" sx={{ mb: 4 }}>
        404 - Page Not Found!
      </Typography>
      <Typography align="center">
        Go to the <Link to={ROUTERS.HOME}>Home</Link> page
      </Typography>
    </Container>
  );
};

export default NotFoundPage;
