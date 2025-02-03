import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Box, Button, TextField, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import managexAxios from '../../services/api';
import MainContainer from '../../components/common/MainContainer';
import AlertMessage from '../../components/common/AlertMessage';
import FormBox from '../../components/common/FormBox';
import ButtonBox from '../../components/common/ButtonBox';
import { LoginPageContent } from '../../Content/LoginPage';
import { login } from '../../features/authSlice';

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // src/pages/public/LoginPage.js
  const onSubmit = async (data) => {
    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const response = await managexAxios.post('/auth/login', data);
      const { token, user } = response.data;

      // Save token to localStorage
      localStorage.setItem('token', token);

      // Update Redux state
      dispatch(login({ user, token }));

      // Show success message and redirect
      setSuccessMessage('Login successful! Redirecting to home...');
      setTimeout(() => {
        navigate('/Dashboard'); // Use navigate instead of window.location.href
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainContainer maxWidth="xs">
      <Typography variant="h4" component="h1" gutterBottom>
        {LoginPageContent.title}
      </Typography>
      {error && <AlertMessage severity="error" message={error} />}
      {successMessage && <AlertMessage severity="success" message={successMessage} />}
      <FormBox as="form" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          margin="normal"
          fullWidth
          label="Email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Password"
          type="password"
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <Button type="submit" fullWidth variant="contained" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>
        <ButtonBox justifyContent="space-between">
          <Link component={RouterLink} to="/signup" variant="body2">
            {LoginPageContent.signupLink}
          </Link>
          <Link component={RouterLink} to="/reset-password" variant="body2">
            {LoginPageContent.forgotPasswordLink}
          </Link>
        </ButtonBox>
      </FormBox>
    </MainContainer>
  );
};

export default LoginPage;
