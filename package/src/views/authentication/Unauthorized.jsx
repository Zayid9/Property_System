import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Unauthorized = () => (
  <Box
    display="flex"
    flexDirection="column"
    height="100vh"
    justifyContent="center"
    alignItems="center"
    textAlign="center"
  >
    <Typography variant="h3" mb={3}>Unauthorized Access</Typography>
    <Typography variant="body1" mb={3}>
      You do not have permission to view this page.
    </Typography>
    <Button variant="contained" component={Link} to="/auth/login">
      Back to Login
    </Button>
  </Box>
);

export default Unauthorized;