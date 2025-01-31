import { styled } from '@mui/system';
import { Box, Button, Container, TextField, Alert } from '@mui/material';

export const StyledContainer = styled(Container)({
  width: '396px',
  padding: '16px',
  display: 'flex',
  justifyContent: 'center',
  marginTop: '64px',
});

export const StyledBox = styled(Box)({
  display: 'block',
  marginTop: '8px',
  width: '100%',
  textAlign: 'center',
});

export const StyledForm = styled(Box)({
  marginTop: '8px',
  width: '100%',
});

export const StyledTextField = styled(TextField)({
  marginTop: '8px',
  marginBottom: '8px',
  width: '100%',
});

export const StyledButton = styled(Button)({
  marginTop: '24px',
  marginBottom: '16px',
  width: '100%',
});

export const StyledLinkBox = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
});

export const StyledAlert = styled(Alert)({
  width: '100%',
  marginBottom: '16px',
});
