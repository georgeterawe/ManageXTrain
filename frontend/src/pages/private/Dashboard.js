import React from 'react';
import { Box } from '@mui/material';
import SideMenu from '../../components/SideMenu';
import HeaderBar from '../../components/HeaderBar';
import UserListTable from './UserListTable';

const Dashboard = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <SideMenu />
      <Box sx={{ flexGrow: 1 }}>
        <HeaderBar />
        <Box sx={{ p: 3 }}>
          <UserListTable />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
