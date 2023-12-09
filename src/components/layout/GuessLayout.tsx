import React from "react";
import { Link, Outlet } from "react-router-dom";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";
import { Footer } from "../footer/Footer";

const LoginPromptContainer = styled(Paper)`
  padding: 20px;
  margin: 20px auto;
  max-width: 400px;
  text-align: center;
`;

const LoginPrompt = () => {
  return (
    <LoginPromptContainer elevation={3}>
      <Typography variant="h5" gutterBottom>
        Welcome to our website!
      </Typography>
      <Typography variant="body1" paragraph>
        To access this content, please log in.
      </Typography>
      <Button
        component={Link}
        to="/login"
        variant="contained"
        color="primary"
        size="large"
      >
        Login
      </Button>
    </LoginPromptContainer>
  );
};

export default LoginPrompt;

const GuestLayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const GuestLayout: React.FC = () => (
  <GuestLayoutContainer className="main">
    <h1>Welcome to the Guest Layout</h1>
    <LoginPrompt />
    <Outlet />
    <Footer />
  </GuestLayoutContainer>
);
