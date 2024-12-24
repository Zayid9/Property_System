import React from 'react';
import { Button, Stack } from '@mui/material';
import DashboardCard from '../../../components/shared/DashboardCard';

const QuickActions = () => {
  return (
    <DashboardCard title="Quick Actions">
      <Stack spacing={2} direction="row">
        <Button variant="contained" color="primary">Add Property</Button>
        <Button variant="contained" color="secondary">New Tenant</Button>
        <Button variant="contained" color="success">Log Request</Button>
      </Stack>
    </DashboardCard>
  );
};

export default QuickActions;
