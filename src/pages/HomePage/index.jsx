import { Container, List, ListItem, Typography } from '@mui/material';
import Hero from './components/Hero';

const HomePage = () => {
  return (
    <>
      <Hero />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography sx={{ mb: 4 }}>
          Upload photos of your vehicle, and our AI will analyze damaged areas, detect body parts affected, and provide
          a quick, preliminary repair cost estimate.
        </Typography>
        <Typography variant="h3" sx={{ mb: 2 }}>
          How it works
        </Typography>
        <List component="ol" sx={{ listStyle: 'decimal', pl: 2, mb: 3 }}>
          <ListItem sx={{ display: 'list-item' }}>Upload photos of the car (left, right, front, rear).</ListItem>
          <ListItem sx={{ display: 'list-item' }}>AI analyzes damage and identifies affected body parts.</ListItem>
          <ListItem sx={{ display: 'list-item' }}>
            Get an instant estimate with a price range, required work, and parts.
          </ListItem>
        </List>
        <strong>Fast. Accurate. Easy to use.</strong>
      </Container>
    </>
  );
};
export default HomePage;
