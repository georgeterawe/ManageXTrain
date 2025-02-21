import React from 'react';
import { styled } from '@mui/material';

const ProfileUserInfoWrapper = styled('div')(({ theme }) => ({
  paddingLeft: theme.breakpoints.up('md') ? theme.spacing(2) : 0,
  marginTop: theme.spacing(8),
  marginBottom: theme.spacing(10),
}));

export default ProfileUserInfoWrapper;
