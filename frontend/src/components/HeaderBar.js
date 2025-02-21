import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { toggleSideMenu } from '../features/layoutSlice';
import AccountCircle from '@mui/icons-material/AccountCircle';
import InfoIcon from '@mui/icons-material/Info';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

const StyledLink = styled(Link)({
  color: '#fff',
  display: 'flex', // Ensures icon aligns properly
  alignItems: 'center',
});

const Title = styled(Typography)({
  flexGrow: 1,
  textAlign: 'left',
  marginLeft: '16px',
});

const RightIcons = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px', // Adjust gap to space the icons evenly
});

const HeaderBar = () => {
  const dispatch = useDispatch();

  return (
    <AppBar position="sticky">
      <Toolbar>
        {/* Menu Button */}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={() => dispatch(toggleSideMenu())}
          edge="start"
        >
          <MenuIcon />
        </IconButton>

        {/* Project Title (Takes Space in Between) */}
        <Title variant="h6" component="div">
          Manage X
        </Title>

        {/* Right Side Icons */}
        <RightIcons>
          <IconButton color="inherit">
            <StyledLink to="about">
              <InfoIcon />
            </StyledLink>
          </IconButton>
          <IconButton color="inherit">
            <StyledLink to="/profile">
              <AccountCircle />
            </StyledLink>
          </IconButton>
        </RightIcons>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderBar;
