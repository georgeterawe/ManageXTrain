// src/pages/public/ResetPasswordPage.js
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Container, Alert } from '@mui/material';
import MainContainer from '../../components/common/MainContainer';
import FormBox from '../../components/common/FormBox';
import { ResetPasswordPageContent } from '../../Content/ResetPasswordPage';

const ResetPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [error, setError] = useState('');

  const password = watch('password', '');

  const onSubmit = (data) => {
    // We'll integrate with API later
    console.log(data, token);
    navigate('/login'); // Temporary redirect for demonstration
  };

  return (
    <MainContainer maxWidth="xs">
      <Typography variant="h4" component="h1" gutterBottom>
        {ResetPasswordPageContent.title}
      </Typography>

      {error && <Alert severity="error" message={error} />}

      <FormBox as="form" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          margin="normal"
          fullWidth
          label="New Password"
          type="password"
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters',
            },
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message: 'Password must contain uppercase, lowercase, number and special character',
            },
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        <TextField
          margin="normal"
          fullWidth
          label="Confirm New Password"
          type="password"
          {...register('confirmPassword', {
            required: 'Please confirm your password',
            validate: (value) => value === password || 'Passwords do not match',
          })}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
        />

        <Button type="submit" fullWidth variant="contained">
          {ResetPasswordPageContent.resetPasswordButton}
        </Button>
      </FormBox>
    </MainContainer>
  );
};

export default ResetPasswordPage;
