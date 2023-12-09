import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import useAppSelector from "../hooks/useAppSelector";
import { currentAccessToken } from "../redux/reducers/authReducer";

interface ProtectedRouteProps {
  path: string;
  element: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ path, element }) => {
  const accessToken = useAppSelector(currentAccessToken);

  return (
    <Routes>
      {accessToken ? (
        <Route path={path} element={element} />
      ) : (
        <Route path="login" element={<Navigate to="/login" />} />
      )}
    </Routes>
  );
};

export default ProtectedRoute;
