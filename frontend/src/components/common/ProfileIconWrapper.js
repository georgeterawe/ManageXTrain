import React from 'react';
import { styled } from '@mui/material';

const ProfileIconWrapper = styled('span')(({ theme }) => ({
  marginRight: theme.spacing(1),
  '& > svg': {
    fontSize: 20,
  },
}));

export default ProfileIconWrapper;
