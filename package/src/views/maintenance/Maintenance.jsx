import React from 'react';
import { Typography } from '@mui/material';
import PageContainer from '../../components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';

const Maintenance = () => (
  <PageContainer title="Maintenance" description="Handle maintenance requests">
    <DashboardCard title="Maintenance Requests">
      <Typography variant="body1">Track and resolve maintenance issues.</Typography>
    </DashboardCard>
  </PageContainer>
);

export default Maintenance;
