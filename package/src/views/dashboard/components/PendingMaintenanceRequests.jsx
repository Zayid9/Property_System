import React from 'react';
import { Typography } from '@mui/material';
import DashboardCard from '../../../components/shared/DashboardCard';

const PendingMaintenanceRequests = () => {
  const pendingRequests = 12; // Replace with dynamic data

  return (
    <DashboardCard title="Pending Maintenance Requests">
      <Typography variant="h3">{pendingRequests}</Typography>
    </DashboardCard>
  );
};

export default PendingMaintenanceRequests;
