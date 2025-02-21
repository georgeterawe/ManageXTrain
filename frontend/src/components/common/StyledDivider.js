import React from 'react';
import { Divider } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledDivider = styled(Divider)(({ theme }) => ({
  margin: `${theme.spacing(2)} 0`,
}));

export default StyledDivider;
