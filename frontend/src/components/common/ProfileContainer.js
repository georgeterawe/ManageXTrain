import React from 'react';
import { Container } from '@mui/material';
import { styled } from '@mui/material/styles';

const ProfileContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

export default ProfileContainer;
