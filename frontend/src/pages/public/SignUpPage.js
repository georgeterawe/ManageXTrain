import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Link,
  Alert,
  IconButton,
  InputAdornment,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { Link as RouterLink } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { SignUpPageContent } from '../../Content/SignUpPage';
import managexAxios from '../../services/api';
import MainContainer from '../../components/common/MainContainer';
import AlertMessage from '../../components/common/AlertMessage';
import ButtonBox from '../../components/common/ButtonBox';
import FormBox from '../../components/common/FormBox';
const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // For Password field
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // For Confirm Password field

  const password = watch('password', '');

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const userData = {
        Username: data.fullName,
        Email: data.email,
        Title: data.title,
        PasswordHash: data.password,
      };
      const response = await managexAxios.post('/auth/signup', userData);
      console.log('Sign-up successful:', response.data);
      setSuccessMessage('Sign-up successful! Redirecting to login...');
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    } catch (err) {
      console.error('Error during sign-up:', err);
      setError(err.response?.data?.message || 'Sign-up failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainContainer maxWidth="xs">
      {/* // <Container maxWidth="xs"> */}

      <Typography variant="h4" component="h1" gutterBottom>
        {SignUpPageContent.title}
      </Typography>

      {error && (
        // <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
        //   {error}
        // </Alert>
        <AlertMessage severity="error" message={error} />
      )}

      {successMessage && (
        // <Alert severity="success" sx={{ width: '100%', mb: 2 }}>
        //   {successMessage}
        // </Alert>
        <AlertMessage severity="success" message={successMessage} />
      )}

      <FormBox as="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Full Name"
              {...register('fullName', {
                required: 'Full name is required',
                minLength: {
                  value: 2,
                  message: 'Name must be at least 2 characters',
                },
              })}
              error={!!errors.fullName}
              helperText={errors.fullName?.message}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
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
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Title"
              {...register('title', {
                required: 'Title is required',
                minLength: {
                  value: 2,
                  message: 'Title must be at least 2 characters',
                },
              })}
              error={!!errors.title}
              helperText={errors.title?.message}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters',
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    'Password must contain uppercase, lowercase, number and special character',
                },
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (value) => value === password || 'Passwords do not match',
              })}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowConfirmPassword} edge="end">
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>

        <Button type="submit" fullWidth variant="contained" disabled={isLoading}>
          {isLoading ? 'Signing Up...' : SignUpPageContent.signUpButton}
        </Button>
        <ButtonBox justifyContent="space-between">
          <Link component={RouterLink} to="/login" variant="body2">
            {SignUpPageContent.loginLink}
          </Link>
          <Link component={RouterLink} to="/" variant="body2">
            {SignUpPageContent.homePageLink}
          </Link>
        </ButtonBox>
      </FormBox>
      {/* </Box> */}
    </MainContainer>
  );
};

export default SignUpPage;
