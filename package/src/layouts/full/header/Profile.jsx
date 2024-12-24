import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Avatar,
  Box,
  Menu,
  Button,
  IconButton,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { IconBuilding, IconCreditCard, IconTool, IconLogout, IconUser } from '@tabler/icons-react';
import toast from 'react-hot-toast';

// Import Profile Image
import ProfileImg from '../../../assets/images/profile/user-1.jpg';

const Profile = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    sessionStorage.clear();
    toast.success('Successfully logged out!');
    navigate('/auth/login');
  };

  return (
    <Box>
      {/* Profile Avatar Button */}
      <IconButton
        size="large"
        color="inherit"
        aria-controls="profile-menu"
        aria-haspopup="true"
        onClick={handleClick}
        sx={{
          ...(anchorEl && {
            color: 'primary.main',
          }),
        }}
      >
        <Avatar
          src={ProfileImg}
          alt="Admin Profile"
          sx={{
            width: 35,
            height: 35,
          }}
        />
      </IconButton>

      {/* Profile Dropdown Menu */}
      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        sx={{
          '& .MuiMenu-paper': {
            width: '220px',
          },
        }}
      >
        <MenuItem>
          <ListItemIcon>
            <IconUser width={20} />
          </ListItemIcon>
          <ListItemText>Manage Profile</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <IconBuilding width={20} />
          </ListItemIcon>
          <ListItemText>Manage Properties</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <IconCreditCard width={20} />
          </ListItemIcon>
          <ListItemText>Payment History</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <IconTool width={20} />
          </ListItemIcon>
          <ListItemText>Maintenance Requests</ListItemText>
        </MenuItem>
        <Box mt={1} py={1} px={2}>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={handleLogout}
          >
            <IconLogout style={{ marginRight: '8px' }} />
            Logout
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;