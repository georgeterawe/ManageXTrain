import React from 'react';
import { styled } from '@mui/material/styles';

const ProfileCard = styled('div')(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius * 2,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
}));

export default ProfileCard;
