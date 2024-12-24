import React from 'react';
import { Typography } from '@mui/material';
import DashboardCard from '../../../components/shared/DashboardCard';

const OverduePayments = () => {
  const overduePayments = 8; // Replace with dynamic data

  return (
    <DashboardCard title="Overdue Payments">
      <Typography variant="h3">{overduePayments}</Typography>
    </DashboardCard>
  );
};

export default OverduePayments;
