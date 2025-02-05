import React from 'react';
import { Box } from '@mui/material';
import SideMenu from '../../components/SideMenu';
import HeaderBar from '../../components/HeaderBar';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
  return (
    <Box height="100vh" display="flex" flexDirection="column">
      <HeaderBar />

      <Box display="flex" flex="1">
        <Box>
          <SideMenu />
        </Box>

        <Box
          sx={{
            flex: 1,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
