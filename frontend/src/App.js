import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './theme/theme';
import HomePage from './pages/public/HomePage';
import LoginPage from './pages/public/LoginPage';
import SignUpPage from './pages/public/SignUpPage';
import RequestResetPage from './pages/public/RequestResetPage';
import ResetPasswordPage from './pages/public/ResetPasswordPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/reset-password" element={<RequestResetPage />} />
          <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
