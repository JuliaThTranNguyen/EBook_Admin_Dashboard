import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

import { Box, Typography, Button } from "@mui/material";
import styled from "@emotion/styled";

import "./userDetails.scss";
import { User } from "../../types/User";
import useAppSelector from "../../hooks/useAppSelector";
import { currentAccessToken } from "../../redux/reducers/authReducer";
import useAppDispatch from "../../hooks/useAppDispatch";
import { EditUserProfile } from "../../components/dataForm/editData/EditUserProfile";
import { EditRoleColumns, EditUserColumns } from "../../constants/userColumns";
import { EditUserRole } from "../../components/dataForm/editData/EditUserRole";

const TopInfo = styled(Box)({
  display: "flex",
  alignItems: "center",
  marginBottom: 25,
  gap: 25,
});

const CustomButton = styled(Button)({
  color: "primary",
  marginLeft: 15,
  marginBottom: 15,
});

const CustomTitle = styled(Typography)({
  display: "flex",
  marginTop: 15,
  gap: 10,
});

const CustomBody = styled(Typography)({
  marginLeft: 5,
  marginTop: 4,
});

const CustomReturnButton = styled(Link)({
  border: "1px solid lightblue",
  borderRadius: 15,
  color: "lightblue",
  marginTop: 20,
  padding: "15px 25px",
  textDecoration: "none",
  display: "inline-block",
});

// ... (other imports)

export const UserDetails = () => {
  /*FETCHING DATA */
  const accessToken: string | null = useAppSelector(currentAccessToken);
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { loading } = useAppSelector((state) => state.auth);

  const [userData, setUserData] = useState<User | null>(null);
  const [openData, setOpenData] = useState(false);
  const [openRole, setOpenRole] = useState(false);

  const fetchOneUserData = useCallback(async () => {
    if (!accessToken) {
      console.error("Token is missing!");
      return;
    }

    try {
      const response = await axios.get(
        `https://nodejs-server-thjulia.vercel.app/api/v1/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setUserData(response.data.data);
    } catch (error) {
      alert("Oops! There might be something wrong. Please refresh and try again.")
      console.error("Error fetching user details:", error);
    }
    
  }, [id, accessToken]);

  useEffect(() => {
    fetchOneUserData();
  }, [dispatch, accessToken, fetchOneUserData, id]);

  /*EDIT DATA */
  const handleEditSuccess = async () => {
    fetchOneUserData();
  };

  /*HANDLE LOADING DATA ... */
  if (loading || userData === null) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      <Box className="singlePage">
        <Box>
          <TopInfo>
            {userData?.image && (
              <img
                src={userData?.image}
                alt="Author Avatar"
              />
            )}
            <Typography variant="h4" color="white">
              {userData?.firstName} {userData?.lastName}
            </Typography>
            <CustomButton
              variant="outlined"
              onClick={() => setOpenData(true)}
              endIcon="✓"
            >
              Edit Data
            </CustomButton>
            <CustomButton
              variant="outlined"
              onClick={() => setOpenRole(true)}
              endIcon="✓"
            >
              Edit Role
            </CustomButton>
          </TopInfo>
          <CustomTitle variant="h6" color="white">
            First Name:
            <CustomBody variant="body1" color="white">
              {userData?.firstName}
            </CustomBody>
          </CustomTitle>
          <CustomTitle variant="h6" color="white">
            Last Name:
            <CustomBody variant="body1" color="white">
              {userData?.lastName}
            </CustomBody>
          </CustomTitle>
          <CustomTitle variant="h6" color="white">
            Email Address:
            <CustomBody variant="body1" color="white">
              {userData?.email}
            </CustomBody>
          </CustomTitle>
          <CustomTitle variant="h6" color="white">
            User role:
            <CustomBody variant="body1" color="white">
              {userData?.role}
            </CustomBody>
          </CustomTitle>
        </Box>
      </Box>
      <CustomReturnButton to="/users">Back to Users</CustomReturnButton>
      {openData && (
        <EditUserProfile
          user={userData}
          id={id}
          accessToken={accessToken}
          slug="users"
          columns={EditUserColumns}
          setOpen={setOpenData}
          onEditSuccess={handleEditSuccess}
        />
      )}
      {openRole && (
        <EditUserRole
          user={userData}
          id={id}
          accessToken={accessToken}
          slug="users"
          columns={EditRoleColumns}
          setOpen={setOpenRole}
          onEditSuccess={handleEditSuccess}
        />
      )}
    </Box>
  );
};
