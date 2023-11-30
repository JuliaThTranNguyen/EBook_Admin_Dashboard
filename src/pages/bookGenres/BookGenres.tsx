import React, { useState } from 'react'
import { Box, Typography, Button } from '@mui/material'
import styled from '@emotion/styled';
import { DataTable } from "../../components/dataTable/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import { AddData } from "../../components/addData/AddData";
import { listOfBookGenres } from '../../constants/bookGenres';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'genresId',
    headerName: 'Genres ID',
    width: 250,
    editable: true,
    type: 'string',
  },
  {
    field: 'bookId',
    headerName: 'Book ID',
    width: 250,
    editable: true,
    type: 'string',
  },
];

const CustomBox = styled(Box)({
  marginBottom: 10,
});

const CustomButton = styled(Button)({
  color: 'primary',
  marginLeft: 15,
});

export const BookGenres = () => {
  // const handleButtonClick = () => {
  //   // TODO: Add logic for handling button click, e.g., navigating to another API 
  //   // API: /api/v1/users
  //   console.log('Button clicked!');
  // };
  const [open, setOpen] = useState(false)

  return (
    <Box className='authors'>
       <CustomBox>
      <Typography variant="h4" color="white">
      Books & Genres
        <CustomButton onClick={() => setOpen(true)} variant="outlined" endIcon="+">
          Create new relationship
        </CustomButton>
      </Typography>
      </CustomBox>
      <DataTable slug='bookGenres' columns={columns} rows={listOfBookGenres}/>
      {open && <AddData slug='bookGenres' columns={columns} setOpen={setOpen}/>}
    </Box>
  )
}
