// components/ButtonBox.js
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { theme } from '../../theme/theme';

const ButtonBox = styled(Box)(({ justifyContent = 'center', backgroundColor = '' }) => ({
  marginTop: theme.spacing(2),
  display: 'flex',
  backgroundColor,
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
  justifyContent,
}));

export default ButtonBox;
