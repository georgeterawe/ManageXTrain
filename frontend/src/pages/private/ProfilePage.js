import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, Avatar, Container, Paper, Grid, Divider, Button } from '@mui/material';
import { Email, LocationOn, CalendarToday } from '@mui/icons-material';

const ProfilePage = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        {/* Header Section */}
        <Box
          sx={{
            height: 200,
            bgcolor: 'primary.main',
            borderRadius: '16px 16px 0 0',
            mb: -10,
            position: 'relative',
            top: -32,
            left: -32,
            width: 'calc(100% + 64px)',
          }}
        />

        {/* Profile Content */}
        <Grid container spacing={3}>
          {/* Left Column - Avatar */}
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
              <Avatar
                src={user?.profilePic || ''}
                sx={{
                  width: 150,
                  height: 150,
                  mx: 'auto',
                  border: '4px solid white',
                  boxShadow: 2,
                  fontSize: 50,
                }}
              >
                {!user?.profilePic && user?.username?.charAt(0).toUpperCase()}
              </Avatar>
            </Box>
          </Grid>

          {/* Right Column - User Info */}
          <Grid item xs={12} md={8}>
            <Box sx={{ pl: { md: 2 } }}>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                {user?.username || 'Username'}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, color: 'text.secondary' }}>
                <Email sx={{ mr: 1, fontSize: 20 }} />
                <Typography variant="body1">{user?.email || 'Email Address'}</Typography>
              </Box>

              {user?.location && (
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, color: 'text.secondary' }}>
                  <LocationOn sx={{ mr: 1, fontSize: 20 }} />
                  <Typography variant="body1">{user.location}</Typography>
                </Box>
              )}

              {user?.joinDate && (
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, color: 'text.secondary' }}>
                  <CalendarToday sx={{ mr: 1, fontSize: 20 }} />
                  <Typography variant="body1">Joined {user.joinDate}</Typography>
                </Box>
              )}

              <Divider sx={{ my: 2 }} />

              <Typography variant="body1" color="text.secondary">
                {user?.bio || 'No bio available'}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ProfilePage;
