import React, { useState } from 'react'
import { Box, Typography, Button } from '@mui/material'
import styled from '@emotion/styled';
import { DataTable } from "../../components/dataTable/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import { AddData } from "../../components/addData/AddData";
import { totalAuthors } from '../../constants/authors';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'image', headerName: 'AVATAR', width: 100,
    renderCell:(params) => {
        return <img src={params.row.image || "../../assests/nouser.svg"} alt="no avatar" />
    }
},
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
    editable: true,
    type: 'string',
  },
  {
    field: 'bio',
    headerName: 'Bio',
    width: 150,
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

export const Authors = () => {
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
      Authors
        <CustomButton onClick={() => setOpen(true)} variant="outlined" endIcon="+">
          Create new author
        </CustomButton>
      </Typography>
      </CustomBox>
      <DataTable slug='authors' columns={columns} rows={totalAuthors}/>
      {open && <AddData slug='authors' columns={columns} setOpen={setOpen}/>}
    </Box>
  )
}
