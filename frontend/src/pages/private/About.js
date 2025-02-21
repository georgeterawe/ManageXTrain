import React from 'react';
import { Typography, Container, List, ListItem, ListItemText } from '@mui/material';

const AboutPage = () => {
  return (
    <Container maxWidth="md" style={{ marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>
        About This Project
      </Typography>
      <Typography variant="body1" paragraph>
        Welcome to our project! This application is designed to provide a seamless user experience
        using modern web technologies. It is built with scalability, efficiency, and maintainability
        in mind.
      </Typography>
      <Typography variant="h5" gutterBottom>
        Technologies Used
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary="React – A JavaScript library for building user interfaces" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Redux – State management for predictable application behavior" />
        </ListItem>
        <ListItem>
          <ListItemText primary=".NET Core – A powerful backend framework for building APIs" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Material-UI – A React component library for consistent design" />
        </ListItem>
      </List>
    </Container>
  );
};

export default AboutPage;
