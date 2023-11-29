import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { topDealUsers } from '../../constants/users';
import { styled } from '@mui/material/styles';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

export const ProductChartBox = () => {
  const totalUsers = topDealUsers.length;

  const handleButtonClick = () => {
    // TODO: Add logic for handling button click, e.g., navigating to another API 
    // API: /api/v1/users
    console.log('Button clicked!');
  };

  const CustomTypography = styled(Typography)({
    textAlign: 'left',
    marginTop: 90,
    marginBottom: 45,
    color: 'white',
  });

  const CustomButton = styled(Button)({
    color: 'primary',
    marginTop: 10,
  });

  return (
    <>
      <Box>
        <Typography variant="h5" color="white">
          <LibraryBooksIcon /> Total Products:
        </Typography>
        <CustomTypography variant="h3">{totalUsers}</CustomTypography>
      </Box>
      <Box>
        <Typography variant="h6" color="white" marginTop={30}>
          TODO: ADD A LINE CHART FOR PRODUCT DATA
        </Typography>
      </Box>
      <CustomButton onClick={handleButtonClick} variant="outlined" endIcon="→">
          View all
        </CustomButton>
    </>
  );
};
