import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

const Form = styled(Box)(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(1),
}));

Form.defaultProps = {
  component: 'form',
};

export default Form;
