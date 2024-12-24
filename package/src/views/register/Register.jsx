import React from 'react';
import { Typography } from '@mui/material';
import PageContainer from '../../components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';

const Register = () => (
  <PageContainer title="Register User" description="Add new users to the system">
    <DashboardCard title="User Registration">
      <Typography variant="body1">
        Admin can register new users here. Fill in the required details to create a new account.
      </Typography>
    </DashboardCard>
  </PageContainer>
);

export default Register;
