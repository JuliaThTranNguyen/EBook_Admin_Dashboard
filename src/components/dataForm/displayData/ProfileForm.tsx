import React, { useCallback, useEffect, useState } from "react";

import { Box, Paper, Typography, TextField, Button } from "@mui/material";
import styled from "@emotion/styled";

import { User } from "../../../types/User";
import useAppSelector from "../../../hooks/useAppSelector";
import { useNavigate } from "react-router-dom";
import useAppDispatch from "../../../hooks/useAppDispatch";
import {
  UserLogout,
  currentAccessToken,
  getUserProfile,
} from "../../../redux/reducers/authReducer";
import { EditUserProfile } from "../editData/EditUserProfile";
import { EditUserColumns } from "../../../constants/userColumns";

const ProfileContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: 20,
  width: 600,
  margin: "auto",
  marginTop: 50,
});

const ImageContainer = styled("div")({
  textAlign: "center",
});

const ProfileImage = styled("img")({
  borderRadius: "50%",
  width: 100,
  height: 100,
  marginBottom: 10,
});

const ProfileHeader = styled(Typography)({
  marginBottom: 20,
});

const ProfileContent = styled("form")({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  "& .MuiTextField-root": {
    marginBottom: 20,
  },

  "& .MuiButton-root": {
    marginTop: 20,
  },
});

const FormButton = styled(Button)({
  color: "primary",
  marginLeft: 0,
  marginTop: 5,
});

export const ProfileForm = () => {
  /*FETCHING DATA */
  const { user, loading } = useAppSelector((state) => state.auth);
  const [userData, setUserData] = useState<User | null>(null);

  const accessToken: string | null = useAppSelector(currentAccessToken);
  const id = userData?._id;
  const dispatch = useAppDispatch();

  const fetchUserProfile = useCallback(async () => {
    try {
      if (!accessToken) {
        alert("Oops! There might be something wrong. Please refresh and try again.")
        console.error("Token is missing!");
        return;
      }

      const response = await dispatch(getUserProfile());
      if (getUserProfile.fulfilled.match(response)) {
        setUserData(response.payload);
      }
    } catch (error) {
      alert("Oops! There might be something wrong. Please refresh and try again.")
      console.error("Error fetching user details:", error);
    }
  }, [dispatch, accessToken]);

  /*EDIT DATA */
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await fetchUserProfile();
    };

    fetchData();
  }, [fetchUserProfile]);

  const handleEditSuccess = async () => {
    fetchUserProfile();
  };

  const handleInputChange = (field: string, value: string) => {
    setUserData((prevUserData: User | null) => {
      if (!prevUserData) {
        return prevUserData;
      }

      return {
        ...prevUserData,
        [field]: value,
      };
    });
  };

  /*HANDLE LOGOUT */
  const navigate = useNavigate();
  const handleLogOut = () => {
    dispatch(UserLogout());
    navigate("/login");
  };

  /*HANDLE LOADING DATA ... */
  if (loading || userData === null) {
    return <div>Loading...</div>;
  }
  return (
    <Box>
      <ProfileContainer>
        <Paper elevation={3}>
          <Box p={3} style={{ display: open ? "none" : "block" }}>
            <ImageContainer>
              <ProfileImage src={user?.image} alt="Profile" />
            </ImageContainer>
            <ProfileHeader variant="h5" gutterBottom>
              Welcome back! {user?.firstName}
            </ProfileHeader>
            <ProfileContent>
              <TextField
                label="First Name"
                variant="outlined"
                fullWidth
                value={userData?.firstName || ""}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
              />
              <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                value={userData?.lastName || ""}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
              />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={userData?.email || ""}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </ProfileContent>

            <FormButton
              variant="outlined"
              color="primary"
              onClick={() => setOpen(true)}
              fullWidth
            >
              Edit Profile
            </FormButton>
            <FormButton
              variant="outlined"
              color="error"
              onClick={() => handleLogOut()}
              fullWidth
            >
              LogOut
            </FormButton>
          </Box>
        </Paper>
      </ProfileContainer>
      {open && (
        <EditUserProfile
          user={user}
          id={id}
          accessToken={accessToken}
          slug="users"
          columns={EditUserColumns}
          setOpen={setOpen}
          onEditSuccess={handleEditSuccess}
        />
      )}
    </Box>
  );
};
