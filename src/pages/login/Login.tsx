// Login.js
import React, {  useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Paper, Typography, TextField, Button } from '@mui/material';
import styled from '@emotion/styled';

import './login.scss'
import useAppDispatch from '../../hooks/useAppDispatch';
import { UserLogin } from '../../redux/reducers/authReducer';

const LoginForm = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 300px;
  margin: auto;
  margin-top: 100px;

  & .MuiTextField-root {
    margin-bottom: 20px;
  }

  & .MuiButton-root {
    margin-top: 20px;
  }
`;

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const loginPayload = { email, password };
    await dispatch(UserLogin(loginPayload)).then((res) => {
      navigate("/profile");
    });
  };

  return (
    <LoginForm className='main'>
      <Paper elevation={3}>
        <Box p={3} component="form" onSubmit={handleSubmit}>
          <Typography variant="h5" gutterBottom>
            Login
          </Typography>
          <TextField label="Email"
           variant="outlined" 
           value={email}
           onChange={(e) => setEmail(e.target.value)}
           fullWidth />
          <TextField label="Password" 
          type="password" variant="outlined" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </Box>
      </Paper>
    </LoginForm>
  );
};

