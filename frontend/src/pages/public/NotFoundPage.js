import React from 'react';
import { Button, Typography, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { NotFoundPageContent } from '../../Content/NotFoundPage';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h1" component="h1" gutterBottom>
          {NotFoundPageContent.title}
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          {NotFoundPageContent.description}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {NotFoundPageContent.message}
        </Typography>
        <Button variant="contained" color="primary" onClick={() => navigate('/')} sx={{ mt: 4 }}>
          {NotFoundPageContent.button}
        </Button>
      </Box>
    </Container>
  );
};

export default NotFoundPage;
