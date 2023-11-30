import React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { topDealUsers } from '../../constants/users';
import { Avatar, Box, Paper } from '@mui/material';
import AirlineStopsIcon from '@mui/icons-material/AirlineStops';

const CustomPaper = styled(Paper)({
  marginTop: 10,
  backgroundColor: '#2f3b50',
  border: '1px solid #2f3b50',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: '16px',
});

const AvatarContainer = styled('div')({
  marginRight: '16px',
  marginLeft: 15,
});

const UserInfoContainer = styled('div')({
  flex: 1,
  marginLeft: 15,
});

const CustomTypography = styled(Typography)({
  margin: 5,
  color: 'white',
});

const CustomAvatar = styled(Avatar)({});

export const TopBox = () => {
  return (
    <Box>
        <Typography variant="h5" color="white"><AirlineStopsIcon /> Top Users</Typography>
      {topDealUsers.map((user) => (
        <CustomPaper key={user.id}>
          <AvatarContainer>
            <CustomAvatar alt={user.username} src={user.image} />
          </AvatarContainer>
          <UserInfoContainer>
            <CustomTypography variant="subtitle1">{user.username}</CustomTypography>
            <CustomTypography variant="body2">{user.email}</CustomTypography>
            <CustomTypography variant="body2">{user.role}</CustomTypography>
          </UserInfoContainer>
        </CustomPaper>
      ))}
    </Box>
  );
};
