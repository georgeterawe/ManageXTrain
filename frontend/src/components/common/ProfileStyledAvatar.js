import React from 'react';
import { Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';

const ProfileStyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 150,
  height: 150,
  margin: '0 auto',
  border: `4px solid ${theme.palette.background.paper}`,
  boxShadow: theme.shadows[2],
  fontSize: 50,
}));

export default ProfileStyledAvatar;
