import React from 'react';
import { Typography } from '@mui/material';
import DashboardCard from '../../../components/shared/DashboardCard';

const TotalRevenue = () => {
  const totalRevenue = "$15,000"; // Replace with dynamic data

  return (
    <DashboardCard title="Total Revenue">
      <Typography variant="h3">{totalRevenue}</Typography>
    </DashboardCard>
  );
};

export default TotalRevenue;
