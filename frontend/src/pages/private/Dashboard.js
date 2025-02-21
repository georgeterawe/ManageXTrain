import React from 'react';
import { Box } from '@mui/material';
import SideMenu from '../../components/SideMenu';
import HeaderBar from '../../components/HeaderBar';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/authSlice';
import managexAxios from '../../services/api';

const Dashboard = () => {
  const dispatch = useDispatch();
  return (
    <Box height="100vh" display="flex" flexDirection="column">
      <HeaderBar />
      <Box display="flex" flex="1">
        <Box>
          <SideMenu />
        </Box>
        <Box flex="1">
          <Outlet />
        </Box>
      </Box>
      <button
        onClick={async () => {
          try {
            const sessionId = localStorage.getItem('sessionId');
            await managexAxios.post('/auth/logout', { sessionId }); // Call API first
          } catch (err) {
            console.error('Logout API error:', err);
          }

          dispatch(logout());
        }}
      >
        Logout
      </button>
    </Box>
  );
};

export default Dashboard;
