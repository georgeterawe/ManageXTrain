import React from 'react';
import { styled } from '@mui/material/styles';

const ProfileHeaderBackground = styled('div')(({ theme }) => ({
  height: 200,
  backgroundColor: theme.palette.primary.main,
  borderRadius: '16px 16px 0 0',
  marginBottom: -80,
  position: 'relative',
  top: -32,
  left: -32,
  width: 'calc(100% + 64px)',
}));

export default ProfileHeaderBackground;
