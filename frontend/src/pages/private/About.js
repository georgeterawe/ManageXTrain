import React from 'react';
import { Typography } from '@mui/material';

const AboutPage = () => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        About This Project
      </Typography>
      <Typography variant="body1">This project uses the following technologies:</Typography>
      <ul>
        <li>React</li>
        <li>Redux</li>
        <li>.NET Core</li>
        <li>Material-UI</li>
      </ul>
    </div>
  );
};

export default AboutPage;
