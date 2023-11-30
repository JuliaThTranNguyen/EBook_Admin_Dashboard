import React from 'react'
import "./authors.scss"
import { Box, Typography, Button } from '@mui/material'
import styled from '@emotion/styled';

const CustomBox = styled(Box)({
  marginBottom: 10,
});

const CustomButton = styled(Button)({
  color: 'primary',
  marginLeft: 15,
});

export const Authors = () => {
  const handleButtonClick = () => {
    // TODO: Add logic for handling button click, e.g., navigating to another API 
    // API: /api/v1/users
    console.log('Button clicked!');
  };

  return (
    <Box className='authors'>
       <CustomBox>
      <Typography variant="h4" color="white">
        Authors
        <CustomButton onClick={handleButtonClick} variant="outlined" endIcon="+">
          Create new author
        </CustomButton>
      </Typography>
      </CustomBox>
      
      {/* <DataTable /> */}
    </Box>
  )
}
