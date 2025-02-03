import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import InfoIcon from '@mui/icons-material/Info';

const HeaderBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My Project
        </Typography>
        <IconButton color="inherit">
          <InfoIcon />
        </IconButton>
        <IconButton color="inherit">
          <AccountCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderBar;
