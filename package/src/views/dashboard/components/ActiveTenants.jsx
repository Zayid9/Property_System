import React from 'react';
import { Typography } from '@mui/material';
import DashboardCard from '../../../components/shared/DashboardCard';

const ActiveTenants = () => {
  const activeTenants = 85; // Replace with dynamic data

  return (
    <DashboardCard title="Active Tenants">
      <Typography variant="h3">{activeTenants}</Typography>
    </DashboardCard>
  );
};

export default ActiveTenants;
