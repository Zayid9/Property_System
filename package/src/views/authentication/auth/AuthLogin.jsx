import React, { useState } from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import toast from 'react-hot-toast';

const AuthLogin = ({ title }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ username: '', password: '' });
  const [toastId, setToastId] = useState(null);

  const validateUsername = (value) => {
    if (!value.trim()) return 'Username is required';
    return '';
  };

  const validatePassword = (value) => {
    if (!value.trim()) return 'Password is required';
    if (value.length < 6) return 'Password must be at least 6 characters';
    return '';
  };

  const handleSignIn = () => {
    const usernameError = validateUsername(username);
    const passwordError = validatePassword(password);

    if (usernameError || passwordError) {
      setErrors({ username: usernameError, password: passwordError });
      if (toastId) {
        toast.dismiss(toastId);
      }
      const id = toast.error('Please fix the errors before submitting.');
      setToastId(id);
      return;
    }

    const users = [
      { username: 'admin', password: '123456', role: 'admin' },
      { username: 'user', password: 'userpass', role: 'user' },
    ];

    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      sessionStorage.setItem('authToken', 'mock-token');
      sessionStorage.setItem('userRole', user.role);
      if (user.role === 'admin') {
        if (toastId) {
          toast.dismiss(toastId);
        }
        const id = toast.success('Welcome Admin! Redirecting to dashboard...');
        setToastId(id);
        navigate('/dashboard');
      } else {
        if (toastId) {
          toast.dismiss(toastId);
        }
        const id = toast.error('Unauthorized: Only admins can access the dashboard.');
        setToastId(id);
      }
    } else {
      if (toastId) {
        toast.dismiss(toastId);
      }
      const id = toast.error('Invalid username or password. Please try again.');
      setToastId(id);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSignIn();
    }
  };

  const handleBlur = (field, value) => {
    const validationFunction = field === 'username' ? validateUsername : validatePassword;
    setErrors((prevErrors) => ({ ...prevErrors, [field]: validationFunction(value) }));
  };

  return (
    <Box onKeyPress={handleKeyPress}>
      {title && <Typography fontWeight="700" variant="h2" mb={1}>{title}</Typography>}
      <Stack>
        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb="5px">Username</Typography>
          <CustomTextField
            id="username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onBlur={(e) => handleBlur('username', e.target.value)}
            error={!!errors.username}
            helperText={errors.username}
          />
        </Box>
        <Box mt="25px">
          <Typography variant="subtitle1" fontWeight={600} mb="5px">Password</Typography>
          <CustomTextField
            id="password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={(e) => handleBlur('password', e.target.value)}
            error={!!errors.password}
            helperText={errors.password}
          />
        </Box>
      </Stack>
      <Box mt={3}>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          onClick={handleSignIn}
        >
          Sign In
        </Button>
      </Box>
    </Box>
  );
};

export default AuthLogin;