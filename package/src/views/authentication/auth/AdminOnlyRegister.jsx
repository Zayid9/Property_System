import React, { useState } from 'react';
import { Box, Typography, Button, Stack, Alert } from '@mui/material';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';

const AdminOnlyRegister = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Placeholder for admin registration logic
    setSuccess(`User ${username} has been successfully registered.`);
    setError('');
    setUsername('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <Box>
      <Typography fontWeight="700" variant="h4" mb={2}>Register New User</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      <Stack spacing={3}>
        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb="5px">Username</Typography>
          <CustomTextField 
            id="register-username" 
            variant="outlined" 
            fullWidth 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Box>
        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb="5px">Password</Typography>
          <CustomTextField 
            id="register-password" 
            type="password" 
            variant="outlined" 
            fullWidth 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb="5px">Confirm Password</Typography>
          <CustomTextField 
            id="register-confirm-password" 
            type="password" 
            variant="outlined" 
            fullWidth 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Box>
      </Stack>
      <Box mt={3}>
        <Button color="primary" variant="contained" size="large" fullWidth onClick={handleRegister}>
          Register User
        </Button>
      </Box>
    </Box>
  );
};

export default AdminOnlyRegister;
