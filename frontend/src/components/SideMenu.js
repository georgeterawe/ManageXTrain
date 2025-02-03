import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import InfoIcon from '@mui/icons-material/Info';
import PeopleIcon from '@mui/icons-material/People';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const StyledDrawer = styled(Drawer)({
  '& .MuiDrawer-paper': {
    width: 250,
    padding: '10px',
  },
});

const SideMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return;
    setIsOpen(open);
  };

  return (
    <>
      <IconButton
        onClick={toggleDrawer(true)}
        aria-label="Open menu"
        sx={{ position: 'absolute', top: 100, left: 10 }}
      >
        <MenuIcon fontSize="large" />
      </IconButton>
      <StyledDrawer anchor="left" open={isOpen} onClose={toggleDrawer(false)}>
        <List>
          <ListItem button component={Link} to="/about" onClick={toggleDrawer(false)}>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="About" />
          </ListItem>
          <ListItem button component={Link} to="/userlist" onClick={toggleDrawer(false)}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="User List" />
          </ListItem>
        </List>
      </StyledDrawer>
    </>
  );
};

export default SideMenu;
