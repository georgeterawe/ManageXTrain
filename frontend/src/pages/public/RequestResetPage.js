import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, TextField, Typography, Container, Link, Alert } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import MainContainer from '../../components/common/MainContainer';
import ButtonBox from '../../components/common/ButtonBox';
import FormBox from '../../components/common/FormBox';
import AlertMessage from '../../components/common/AlertMessage';
import { RequestResetPageContent } from '../../Content/RequestResetPage';
import ManagexAxios from '../../services/api';

const RequestResetPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setError('');
      console.log(data);

      const response = await ManagexAxios.post('/auth/request-password-reset', data);

      if (response.status === 200) {
        setSuccess(true);
        console.log('hiiiii');
      }
    } catch (err) {
      console.error('API Error:', err.response?.data); // Log the full error response
      setError(err.response?.data?.message || 'Reset password failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate('/login');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  if (success) {
    return (
      <MainContainer maxWidth="xs">
        <Typography variant="h5" gutterBottom>
          {RequestResetPageContent.titleIfSuccess}
        </Typography>
        <Typography variant="body1" align="center">
          {RequestResetPageContent.messageIfSuccess}
        </Typography>
        <ButtonBox>
          <Link component={RouterLink} to="/login" variant="body2">
            {RequestResetPageContent.returnToLogin}
          </Link>
        </ButtonBox>
      </MainContainer>
    );
  }

  return (
    <MainContainer maxWidth="xs">
      <Typography variant="h4" component="h1" gutterBottom>
        {RequestResetPageContent.title}
      </Typography>

      {error && <AlertMessage severity="error" message={error} />}

      <FormBox as="form" onSubmit={handleSubmit(onSubmit)}>
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
          onChange={() => setError('')}
        />

        <Button type="submit" fullWidth variant="contained" disabled={loading}>
          {loading ? 'Processing...' : RequestResetPageContent.requestResetButton}
        </Button>

        <ButtonBox>
          <Link component={RouterLink} to="/login" variant="body2">
            {RequestResetPageContent.loginLink}
          </Link>
        </ButtonBox>
      </FormBox>
    </MainContainer>
  );
};

export default RequestResetPage;
