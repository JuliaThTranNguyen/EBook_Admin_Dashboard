import React from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import useAppSelector from "../hooks/useAppSelector";
import { currentAccessToken, currentUser } from "../redux/reducers/authReducer";

interface UnauthorizedAccessProps {
  message: string;
}

const UnauthorizedAccess: React.FC<UnauthorizedAccessProps> = ({ message }) => (
  <div style={{ padding: '20px', border: '1px solid red', color: 'red' }}>
    <p>{message}</p>
  </div>
);

interface ProtectedRouteProps {
  path: string;
  element: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ path, element }) => {
  const accessToken = useAppSelector(currentAccessToken);
  const user = useAppSelector(currentUser);

  // Check if there is an access token and the user has the 'ADMIN' role
  const isAdmin = accessToken && user?.role === 'ADMIN';

  // Redirect to login if no access token or not 'ADMIN' role
  if (!isAdmin) {
    // Render UnauthorizedAccess component instead of using alert
    return <UnauthorizedAccess message="Unauthorized Access!" />;
    // Alternatively, you can still use alert if you prefer:
    // alert("Unauthorized Access!");
    // return <Navigate to="/login" />;
  }

  // Wrap the protected route in a Routes component
  return (
    <Routes>
      <Route path={path} element={element} />
    </Routes>
  );
};

export default ProtectedRoute;
