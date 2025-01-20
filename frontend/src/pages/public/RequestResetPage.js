// src/pages/public/RequestResetPage.js
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, TextField, Typography, Container, Link, Alert } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const RequestResetPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = (data) => {
    // We'll integrate with API later
    console.log(data);
    setSuccess(true); // Temporary for demonstration
  };

  if (success) {
    return (
      <Container maxWidth="xs">
        <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Check Your Email
          </Typography>
          <Typography variant="body1" align="center" sx={{ mb: 2 }}>
            If an account exists with this email, you will receive password reset instructions.
          </Typography>
          <Link component={RouterLink} to="/login" variant="body2">
            Return to Login
          </Link>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Reset Password
        </Typography>

        {error && (
          <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1, width: '100%' }}>
          <TextField
            margin="normal"
            fullWidth
            label="Email"
            autoFocus
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

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Send Reset Link
          </Button>

          <Box sx={{ textAlign: 'center' }}>
            <Link component={RouterLink} to="/login" variant="body2">
              Remember your password? Login
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default RequestResetPage;
