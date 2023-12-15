import React from "react";
import { Route, Routes } from "react-router-dom";
import useAppSelector from "../hooks/useAppSelector";
import { currentAccessToken, currentUser } from "../redux/reducers/authReducer";
import { Box, Typography } from "@mui/material";

interface UnauthorizedAccessProps {
  message: string;
}

const UnauthorizedAccess: React.FC<UnauthorizedAccessProps> = ({ message }) => (
  <Box style={{ padding: '20px', border: '1px solid red', color: 'red' }}>
    <Typography variant="body2" color={'error'}>{message}</Typography>
  </Box>
);

interface ProtectedRouteProps {
  path: string;
  element: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ path, element }) => {
  const accessToken = useAppSelector(currentAccessToken);
  const user = useAppSelector(currentUser);

  const isAdmin = accessToken && user?.role === 'ADMIN';

  if (!isAdmin) {
    return <UnauthorizedAccess message="Unauthorized Access!" />;
  }

  return (
    <Routes>
      <Route path={path} element={element} />
    </Routes>
  );
};

export default ProtectedRoute;
