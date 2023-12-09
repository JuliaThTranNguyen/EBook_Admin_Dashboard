import React, { useEffect, useState } from "react";

import styled from "@emotion/styled";
import { Box, Typography, Button } from "@mui/material";

import "./users.scss";
import { AddOneUser } from "../../components/dataForm/addData/AddOneUser";
import useAppSelector from "../../hooks/useAppSelector";
import useAppDispatch from "../../hooks/useAppDispatch";
import { currentAccessToken, getAllUsers } from "../../redux/reducers/authReducer";
import {  CreateUserColumns, UserColumns } from "../../constants/userColumns";
import { DataTable } from "../../components/dataForm/displayData/DataTable";

const CustomBox = styled(Box)({
  marginBottom: 10,
});

const CustomButton = styled(Button)({
  color: "primary",
  marginLeft: 15,
});

export const Users = () => {
  const { allUserData, loading }= useAppSelector((state) => state.auth);
  const accessToken: string | null = useAppSelector(currentAccessToken);
  const [open, setOpen] = useState(false)
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
    console.log("user is fetching datas")
  }, [dispatch, accessToken]);

  if (!accessToken) {
    return <div>No access token found.</div>;
  }

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
      {loading ? ("LOADING ... ") : (
        <DataTable slug='users' columns={UserColumns} rows={allUserData}/>
      )}
      {open && <AddOneUser slug='users' accessToken={accessToken} columns={CreateUserColumns} setOpen={setOpen}/>}
    </Box>
  );
};
