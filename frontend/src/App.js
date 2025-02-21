import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './theme/theme';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './features/authSlice'; // Import logout action
import ErrorBoundary from './components/error/ErrorBoundary';
import HomePage from './pages/public/HomePage';
import LoginPage from './pages/public/LoginPage';
import SignUpPage from './pages/public/SignUpPage';
import RequestResetPage from './pages/public/RequestResetPage';
import ResetPasswordPage from './pages/public/ResetPasswordPage';
import NotFoundPage from './pages/public/NotFoundPage';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/private/Dashboard';
import AboutPage from './pages/private/About';
import UserListTable from './pages/private/UserListTable';
import ProfilePage from './pages/private/ProfilePage';

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const tokenExpiration = useSelector((state) => state.auth.tokenExpiration);

  // Function to check if the token is expired and log out automatically
  useEffect(() => {
    if (!tokenExpiration) return;

    const checkTokenExpiration = () => {
      if (new Date(tokenExpiration) < new Date()) {
        dispatch(logout()); // Log out if token is expired
      }
    };

    // Check expiration every second for real-time logout
    const interval = setInterval(checkTokenExpiration, 1000);

    return () => clearInterval(interval); // Cleanup when component unmounts
  }, [dispatch, tokenExpiration]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/reset-password" element={<RequestResetPage />} />
            <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
            {/* Protected Routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />}>
                <Route path="about" element={<AboutPage />} />
                <Route path="users" element={<UserListTable />} />
              </Route>
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
