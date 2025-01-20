import { Box, Button, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Terawe
        </Typography>
        <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
          <Button variant="contained" color="primary" onClick={() => navigate('/login')}>
            Login
          </Button>
          <Button variant="outlined" color="primary" onClick={() => navigate('/signup')}>
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default HomePage;
