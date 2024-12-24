import React from 'react';
import { Typography } from '@mui/material';
import PageContainer from '../../components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';

const Reports = () => (
  <PageContainer title="Reports" description="View and analyze reports">
    <DashboardCard title="Reports Overview">
      <Typography variant="body1">
        Access analytics, rent collection trends, property performance, and maintenance cost reports here.
      </Typography>
    </DashboardCard>
  </PageContainer>
);

export default Reports;
