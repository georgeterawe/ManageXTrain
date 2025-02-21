import React from 'react';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { NotFoundPageContent } from '../../Content/NotFoundPage';
import MainContainer from '../../components/common/MainContainer';
import ButtonBox from '../../components/common/ButtonBox';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <MainContainer maxWidth="sm">
      <Typography variant="h1" component="h1" gutterBottom>
        {NotFoundPageContent.title}
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom>
        {NotFoundPageContent.description}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {NotFoundPageContent.message}
      </Typography>
      <ButtonBox>
        <Button variant="contained" color="primary" onClick={() => navigate('/')}>
          {NotFoundPageContent.button}
        </Button>
      </ButtonBox>
    </MainContainer>
  );
};

export default NotFoundPage;
