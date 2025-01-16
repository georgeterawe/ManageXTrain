import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client'
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';
import theme from './theme/theme'; // Import your custom theme

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Apply baseline styles */}
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
