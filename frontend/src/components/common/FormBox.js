import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const FormBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1),
  width: '100%',
  marginBottom: theme.spacing(3),
}));

export default FormBox;
