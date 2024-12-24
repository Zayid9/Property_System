import React from 'react';
import { Grid, Box } from '@mui/material';
import PageContainer from "../../components/container/PageContainer"
import TotalProperties from "../dashboard/components/TotalProperties"
import ActiveTenants from "../dashboard/components/ActiveTenants"
import PendingMaintenanceRequests from '../dashboard/components/PendingMaintenanceRequests';
import TotalRevenue from '../dashboard/components/TotalRevenue';
import OverduePayments from '../dashboard/components/OverduePayments';
import RevenueChart from '../dashboard/components/RevenueChart';
import Recent_Transactions from '../dashboard/components/Recent_Transactions';
import MaintenanceRequestsSummary from '../dashboard/components/MaintenanceRequestsSummary';
import QuickActions from '../dashboard/components/QuickActions';

const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="Overview of property management">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} lg={3}><TotalProperties /></Grid>
        <Grid item xs={12} sm={6} lg={3}><ActiveTenants /></Grid>
        <Grid item xs={12} sm={6} lg={3}><PendingMaintenanceRequests /></Grid>
        <Grid item xs={12} sm={6} lg={3}><TotalRevenue /></Grid>
        <Grid item xs={12} lg={6}><RevenueChart /></Grid>
        <Grid item xs={12} lg={6}><Recent_Transactions /></Grid>
        <Grid item xs={12} lg={4}><OverduePayments /></Grid>
        <Grid item xs={12} lg={8}><MaintenanceRequestsSummary /></Grid>
        <Grid item xs={12}><QuickActions /></Grid>
      </Grid>
    </PageContainer>
  );
};

export default Dashboard;
