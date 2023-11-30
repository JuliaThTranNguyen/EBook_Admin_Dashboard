import React from 'react'
import "./books.scss"
import { Box, Typography, Button } from '@mui/material'
import styled from '@emotion/styled';

const CustomBox = styled(Box)({
  marginBottom: 10,
});

const CustomButton = styled(Button)({
  color: 'primary',
  marginLeft: 15,
});

export const Books = () => {
  const handleButtonClick = () => {
    // TODO: Add logic for handling button click, e.g., navigating to another API 
    // API: /api/v1/users
    console.log('Button clicked!');
  };


  return (
    <Box className='products'>
      <CustomBox>
      <Typography variant="h4" color="white">
        Books
        <CustomButton onClick={handleButtonClick} variant="outlined" endIcon="+">
          Create new book
        </CustomButton>
      </Typography>
      </CustomBox>
      
      {/* <DataTable /> */}
    </Box>
  )
}
