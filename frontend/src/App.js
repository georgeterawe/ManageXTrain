import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function App() {
  const message = 'Hello, world'

  return (
    <div style={{ padding: '16px' }}>
      <Typography variant="h1" color="primary">
        Welcome to My App
      </Typography>
      <Button variant="contained" color="primary">
        Click Me
      </Button>
    </div>
  );
}

export default App;
