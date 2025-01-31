import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, TextField, Typography, Container, Link, Alert } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import managexAxios from '../../services/api';
import {
  StyledContainer,
  StyledBox,
  StyledForm,
  StyledTextField,
  StyledButton,
  StyledLinkBox,
  StyledAlert,
} from '../../components/common/StyledLogin';
import MainContainer from '../../components/common/MainContainer';
import AlertMessage from '../../components/common/AlertMessage';
import FormBox from '../../components/common/FormBox';
import ButtonBox from '../../components/common/ButtonBox';

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await managexAxios.post('/auth/login', data);
      localStorage.setItem('token', response.data.token);
      setSuccessMessage('Login successful! Redirecting to home...');
      setTimeout(() => {
        window.location.href = '/';
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
        Login
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
        <Button type="submit" fullWidth variant="contained">
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>
        <ButtonBox justifyContent="space-between">
          <Link component={RouterLink} to="/signup" variant="body2">
            Don't have an account? Sign Up
          </Link>
          <Link component={RouterLink} to="/reset-password" variant="body2">
            Forgot password?
          </Link>
        </ButtonBox>
      </FormBox>
    </MainContainer>
  );

  // return (
  //   <StyledContainer maxWidth="sm">
  //     <StyledBox>
  //       <Typography variant="h4" component="h1" gutterBottom>
  //         Login
  //       </Typography>

  //       {error && (
  //         <StyledAlert severity="error">{error}</StyledAlert>
  //       )}
  //       {successMessage && (
  //         <StyledAlert severity="success">{successMessage}</StyledAlert>
  //       )}

  //       <StyledForm component="form" onSubmit={handleSubmit(onSubmit)}>
  //         <StyledTextField
  //           label="Email"
  //           {...register('email', {
  //             required: 'Email is required',
  //             pattern: {
  //               value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  //               message: 'Invalid email address',
  //             },
  //           })}
  //           error={!!errors.email}
  //           helperText={errors.email?.message}
  //         />

  //         <StyledTextField
  //           label="Password"
  //           type="password"
  //           {...register('password', {
  //             required: 'Password is required',
  //             minLength: {
  //               value: 6,
  //               message: 'Password must be at least 6 characters',
  //             },
  //           })}
  //           error={!!errors.password}
  //           helperText={errors.password?.message}
  //         />

  //         <StyledButton type="submit" variant="contained" disabled={isLoading}>
  //           {isLoading ? 'Logging in...' : 'Login'}
  //         </StyledButton>

  //         <StyledLinkBox>
  //           <Link component={RouterLink} to="/signup" variant="body2">
  //             Don't have an account? Sign Up
  //           </Link>
  //           <Link component={RouterLink} to="/reset-password" variant="body2">
  //             Forgot password?
  //           </Link>
  //         </StyledLinkBox>
  //       </StyledForm>
  //     </StyledBox>
  //   </StyledContainer>
  // );
};

export default LoginPage;
