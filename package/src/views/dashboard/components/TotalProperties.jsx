import React from 'react';
import { Typography } from '@mui/material';
import DashboardCard from '../../../components/shared/DashboardCard';

const TotalProperties = () => {
  const totalProperties = 120; // Replace with dynamic data

  return (
    <DashboardCard title="Total Properties">
      <Typography variant="h3">{totalProperties}</Typography>
    </DashboardCard>
  );
};

export default TotalProperties;
