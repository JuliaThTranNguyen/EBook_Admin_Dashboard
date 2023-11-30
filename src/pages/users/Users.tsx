import React, { useState } from "react";
import "./users.scss";
import { Box, Typography, Button } from "@mui/material";
import { DataTable } from "../../components/dataTable/DataTable";
import styled from "@emotion/styled";
import { GridColDef } from "@mui/x-data-grid";
import { topDealUsers } from "../../constants/users";
import { AddData } from "../../components/addData/AddData";

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'image', headerName: 'AVATAR', width: 100,
    renderCell:(params) => {
        return <img src={params.row.image || "../../assests/nouser.svg"} alt="no avatar" />
    }
},
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
    type: 'string',
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
    type: 'string',
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 200,
    editable: true,
    type: 'string',
  },
  {
    field: 'role',
    headerName: 'Role',
    width: 110,
    editable: true,
    type: 'string',
  },
];

const CustomBox = styled(Box)({
  marginBottom: 10,
});

const CustomButton = styled(Button)({
  color: "primary",
  marginLeft: 15,
});

export const Users = () => {
  // const handleButtonClick = () => {
  //   // TODO: Add logic for handling button click, e.g., navigating to another API
  //   // API: /api/v1/users
  //   console.log("Button clicked!");
  // };
  const [open, setOpen] = useState(false)

  return (
    <Box className="users">
      <CustomBox>
        <Typography variant="h4" color="white">
          Users
          <CustomButton
            onClick={() => setOpen(true)}
            variant="outlined"
            endIcon="+"
          >
            Create new user
          </CustomButton>
        </Typography>
      </CustomBox>
      <DataTable slug='users' columns={columns} rows={topDealUsers}/>
      {open && <AddData slug='users' columns={columns} setOpen={setOpen}/>}
    </Box>
  );
};
