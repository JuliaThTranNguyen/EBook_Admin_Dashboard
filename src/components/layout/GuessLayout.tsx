import React from "react";
import { Link, Outlet } from "react-router-dom";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";
import { Footer } from "../footer/Footer";
import { Box } from "@mui/material";

const LoginPromptContainer = styled(Paper)`
  padding: 20px;
  margin: 20px auto;
  max-width: 400px;
  text-align: center;
`;

export const LoginPrompt = () => {
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
  justify-content: center;
  min-height: 100vh; // Ensure the content takes at least the full height of the viewport
`;

const StyledBox = styled(Box)`
  max-height: 1000px;
`;



export const GuestLayout: React.FC = () => (
  <GuestLayoutContainer className="main">
    <StyledBox>
    <Typography variant="h4">Welcome to the Guest Layout</Typography>
    <LoginPrompt />
    <Outlet />
    <Footer />
    </StyledBox>
  </GuestLayoutContainer>
);
