import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Avatar, Box, Button, Paper } from '@mui/material';
import AirlineStopsIcon from '@mui/icons-material/AirlineStops';

import useAppSelector from '../../hooks/useAppSelector';
import { currentAccessToken, getAllUsers } from '../../redux/reducers/authReducer';
import useAppDispatch from '../../hooks/useAppDispatch';
import { useNavigate } from 'react-router-dom';

const CustomPaper = styled(Paper)({
  marginTop: 20,
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

const CustomTypographyBold = styled(Typography)({
  margin: 5,
  color: 'white',
  fontWeight: 'bold',
});

const CustomTypography = styled(Typography)({
  margin: 5,
  color: 'white',
});

const CustomButton = styled(Button)({
  color: 'primary',
  marginTop: 10,
});

export const TopBox = () => {
  const { allUserData, loading } = useAppSelector((state) => state.auth);
  const accessToken: string | null = useAppSelector(currentAccessToken);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch, accessToken]);

  if (loading || allUserData === null) {
    return <div>Loading...</div>;
  }

  const handleButtonClick = () => {
    navigate("/users");
  };

  const topTenUsers = allUserData.slice(0, 8);

  return (
    <Box>
        <Typography variant="h5" color="white"><AirlineStopsIcon /> Total Users: {allUserData.length}</Typography>
      {topTenUsers.map((user) => (
        <CustomPaper key={user._id}>
          <AvatarContainer>
            <Avatar alt={user.firstName} src={user.image} />
          </AvatarContainer>
          <UserInfoContainer>
            <CustomTypographyBold variant="subtitle1">{user.firstName} {user.lastName}</CustomTypographyBold>
            <CustomTypography variant="body2">{user.email}</CustomTypography>
            <CustomTypography variant="body2">{user.role}</CustomTypography>
          </UserInfoContainer>
        </CustomPaper>
      ))}
        <CustomButton onClick={handleButtonClick} variant="outlined" endIcon="→">
          View all
        </CustomButton>
    </Box>
  );
};
