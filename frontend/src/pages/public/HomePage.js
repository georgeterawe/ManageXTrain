import { Box, Button, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TestError from '../../components/test/TestError';
import { HomePageContent } from '../../Content/HomePage';
import MainContainer from '../../components/common/MainContainer';
import ButtonBox from '../../components/common/ButtonBox';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <MainContainer maxWidth="sm">
      <Typography variant="h2" gutterBottom>
        {HomePageContent.title}
      </Typography>
      <ButtonBox>
        <Button variant="contained" color="primary" onClick={() => navigate('/login')}>
          {HomePageContent.loginButton}
        </Button>
        <Button variant="outlined" color="primary" onClick={() => navigate('/signup')}>
          {HomePageContent.signupButton}
        </Button>
      </ButtonBox>
      {/* <TestError /> */}
    </MainContainer>
  );
};

export default HomePage;
