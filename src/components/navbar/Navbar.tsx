import LogoutIcon from "@mui/icons-material/Logout";
import { Box } from "@mui/material";

import "./navbar.scss";
import logo from "../../assets/logo.svg";
import { User } from "../../types/User";
import useAppDispatch from "../../hooks/useAppDispatch";
import { useNavigate } from "react-router-dom";
import { UserLogout, currentAccessToken, currentUser, getUserProfile } from "../../redux/reducers/authReducer";
import useAppSelector from "../../hooks/useAppSelector";
import { useEffect } from "react";

export const Navbar = () => {
  const user: User | null = useAppSelector(currentUser);
  const accessToken: string | null = useAppSelector(currentAccessToken);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch, accessToken]);

  if (!accessToken) {
    return <div>No access token found.</div>;
  }

  const handleLogOut = () => {
    dispatch(UserLogout());
    navigate("/login");
  };

  return (
    <Box className="navbar">
      <Box className="logo">
        <img src={logo} alt="logo" />
        <span>JuJu Inventory App</span>
      </Box>
      <Box className="icons">
        <Box className="user">
          <img src={user?.image} alt="avatar" />
          <span>{user?.firstName}</span>
        </Box>
        <LogoutIcon onClick={() => handleLogOut()} className="icon" />
      </Box>
    </Box>
  );
};



