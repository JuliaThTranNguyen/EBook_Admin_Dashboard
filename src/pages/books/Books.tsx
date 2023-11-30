import React,{ useState } from 'react'
import "./books.scss"
import { Box, Typography, Button } from '@mui/material'
import styled from '@emotion/styled';
import { AddData } from "../../components/addData/AddData";
import { DataTable } from "../../components/dataTable/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import { totalBooks } from '../../constants/books';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'image', headerName: 'Image', width: 90,
    renderCell:(params) => {
        return <img src={params.row.image || "../../assests/nouser.svg"} alt="no avatar" />
    }
},
  {
    field: 'isbn',
    headerName: 'ISBN',
    width: 100,
    editable: true,
    type: 'string',
  },
  {
    field: 'title',
    headerName: 'Title',
    width: 150,
    editable: true,
    type: 'string',
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 110,
    editable: true,
    type: 'string',
  },
  {
    field: 'publishedDate',
    headerName: 'Public Date',
    width: 200,
    editable: true,
    type: 'Date',
    valueGetter: (params) => new Date().toLocaleString(), // Set to the current date and time
  },
];

const CustomBox = styled(Box)({
  marginBottom: 10,
});

const CustomButton = styled(Button)({
  color: "primary",
  marginLeft: 15,
});

export const Books = () => {
  // const handleButtonClick = () => {
  //   // TODO: Add logic for handling button click, e.g., navigating to another API 
  //   // API: /api/v1/users
  //   console.log('Button clicked!');
  // };

  const [open, setOpen] = useState(false)

  return (
    <Box className='products'>
      <CustomBox>
      <Typography variant="h4" color="white">
        Books
        <CustomButton onClick={() => setOpen(true)} variant="outlined" endIcon="+">
          Create new Book
        </CustomButton>
      </Typography>
      </CustomBox>
      <DataTable slug='books' columns={columns} rows={totalBooks}/>
      {open && <AddData slug='books' columns={columns} setOpen={setOpen}/>}
    </Box>
  )
}
