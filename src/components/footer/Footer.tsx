import React from 'react';
import { Box, Typography } from '@mui/material';

export const Footer = () => {
  return (
    <Box className="footer" display="flex" alignItems="center" justifyContent="space-between" padding={3}>
      <Typography fontWeight="bold">
        JuJu Inventory App
      </Typography>
      <Typography fontSize={14}>
        © Th.Julia Dev Admin Dashboard
      </Typography>
    </Box>
  );
};
