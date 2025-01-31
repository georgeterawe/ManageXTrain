// components/AlertMessage.js
import { Alert } from '@mui/material';

const AlertMessage = ({ severity, message }) => {
  return (
    <Alert severity={severity} sx={{ width: '100%', mb: 2 }}>
      {message}
    </Alert>
  );
};

export default AlertMessage;
