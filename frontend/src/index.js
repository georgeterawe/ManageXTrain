import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';
import theme from './theme/theme'; // Import your custom theme

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline /> {/* Apply baseline styles */}
            <App />
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
