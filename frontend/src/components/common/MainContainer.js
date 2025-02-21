// components/MainContainer.js
import { Container } from '@mui/material';
import { styled } from '@mui/material/styles';

const MainContainer = styled(Container)(
  ({ justifyContent = 'center', flexDirection = 'column', marginTop = '64px' }) => ({
    marginTop,
    display: 'flex',
    flexDirection,
    alignItems: 'center',
    justifyContent,
  })
);

export default MainContainer;
