import React from 'react';
import { styled } from '@mui/material/styles';

const ProfileInfoItem = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

export default ProfileInfoItem;
