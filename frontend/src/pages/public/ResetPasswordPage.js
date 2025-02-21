import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Alert,
  CircularProgress,
} from '@mui/material';
import MainContainer from '../../components/common/MainContainer';
import FormBox from '../../components/common/FormBox';
import { ResetPasswordPageContent } from '../../Content/ResetPasswordPage';
import ManagexAxios from '../../services/api';

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
  const [loading, setLoading] = useState(false);

  const password = watch('password', '');

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setError('');

      const requestBody = {
        token: token, // Pass token from URL
        newPassword: data.password, // Pass new password
      };

      const response = await ManagexAxios.post('/auth/reset-password', requestBody);

      if (response.status === 200) {
        console.log('Password reset successful');
        navigate('/login'); // Redirect to login page after success
      }
    } catch (err) {
      console.error('API Error:', err.response?.data);
      setError(err.response?.data?.message || 'Reset password failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainContainer maxWidth="xs">
      <Typography variant="h4" component="h1" gutterBottom>
        {ResetPasswordPageContent.title}
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

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

        <Button type="submit" fullWidth variant="contained" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : ResetPasswordPageContent.resetPasswordButton}
        </Button>
      </FormBox>
    </MainContainer>
  );
};

export default ResetPasswordPage;
