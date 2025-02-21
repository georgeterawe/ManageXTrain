import React from 'react';
import { useSelector } from 'react-redux';
import { Typography, Avatar, Container, Grid, Divider, Button } from '@mui/material';
import { Email, LocationOn, CalendarToday } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import ProfileAvatarWrapper from '../../components/common/ProfileAvatarWrapper';
import ProfileCard from '../../components/common/ProfileCard';
import ProfileContainer from '../../components/common/ProfileContainer';
import ProfileInfoItem from '../../components/common/ProfileInfoItem';
import ProfileStyledAvatar from '../../components/common/ProfileStyledAvatar';
import ProfileIconWrapper from '../../components/common/ProfileIconWrapper';
import ProfileUserInfoWrapper from '../../components/common/ProfileUserInfoWrapper';
import ProfileHeaderBackground from '../../components/common/ProfileHeaderBackground';
import StyledDivider from '../../components/common/StyledDivider';

const ProfilePage = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <ProfileContainer maxWidth="md">
      <ProfileCard>
        <ProfileHeaderBackground />
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <ProfileAvatarWrapper>
              <ProfileStyledAvatar src={user?.profilePic || ''}>
                {!user?.profilePic && user?.username?.charAt(0).toUpperCase()}
              </ProfileStyledAvatar>
            </ProfileAvatarWrapper>
          </Grid>

          <Grid item xs={12} md={8}>
            <ProfileUserInfoWrapper>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                {user?.username || 'Username'}
              </Typography>

              <ProfileInfoItem>
                <ProfileIconWrapper>
                  <Email />
                </ProfileIconWrapper>
                <Typography variant="body1">{user?.email || 'Email Address'}</Typography>
              </ProfileInfoItem>

              {user?.location && (
                <ProfileInfoItem>
                  <ProfileIconWrapper>
                    <LocationOn />
                  </ProfileIconWrapper>
                  <Typography variant="body1">{user.location}</Typography>
                </ProfileInfoItem>
              )}

              {user?.joinDate && (
                <ProfileInfoItem>
                  <ProfileIconWrapper>
                    <CalendarToday />
                  </ProfileIconWrapper>
                  <Typography variant="body1">Joined {user.joinDate}</Typography>
                </ProfileInfoItem>
              )}

              <StyledDivider />

              <Typography variant="body1" color="text.secondary">
                {user?.bio || 'No bio available'}
              </Typography>
            </ProfileUserInfoWrapper>
          </Grid>
        </Grid>
      </ProfileCard>
    </ProfileContainer>
  );
};

export default ProfilePage;
