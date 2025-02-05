import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { toggleSideMenu } from '../features/layoutSlice';
import AccountCircle from '@mui/icons-material/AccountCircle';
import InfoIcon from '@mui/icons-material/Info';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const HeaderBar = () => {
  const dispatch = useDispatch();
  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={() => dispatch(toggleSideMenu())}
          edge="start"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My Project
        </Typography>
        <IconButton color="inherit">
          <InfoIcon />
        </IconButton>
        <IconButton color="inherit">
          <Link to="/profile" style={{ color: 'inherit', textDecoration: 'none' }}>
            <AccountCircle />
          </Link>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderBar;
