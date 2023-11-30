import React from "react";
import "./users.scss";
import { Box, Typography, Button } from "@mui/material";
import { DataTable } from "../../components/dataTable/DataTable";
import styled from "@emotion/styled";
import { GridColDef } from "@mui/x-data-grid";
import { topDealUsers } from "../../constants/users";

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'avatar', headerName: 'AVATAR', width: 100,
    renderCell:(params) => {
        return <img src={params.row.img || "../../assests/nouser.svg"} alt="no avatar" />
    }
},
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'createdAt',
    headerName: 'Created At',
    width: 200,
  },
  { field: 'verified', headerName: 'VERIFIED', width: 100, type: 'boolean' },
  {
    field: 'role',
    headerName: 'Role',
    width: 150,
    editable: true,
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
  const handleButtonClick = () => {
    // TODO: Add logic for handling button click, e.g., navigating to another API
    // API: /api/v1/users
    console.log("Button clicked!");
  };

  return (
    <Box className="users">
      <CustomBox>
        <Typography variant="h4" color="white">
          Users
          <CustomButton
            onClick={handleButtonClick}
            variant="outlined"
            endIcon="+"
          >
            Create new user
          </CustomButton>
        </Typography>
      </CustomBox>
      <DataTable columns={columns} rows={topDealUsers}/>
    </Box>
  );
};
