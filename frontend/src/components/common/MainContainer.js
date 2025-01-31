// components/MainContainer.js
import { Container } from '@mui/material';
import { styled } from '@mui/material/styles';

const MainContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(8),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

export default MainContainer;
