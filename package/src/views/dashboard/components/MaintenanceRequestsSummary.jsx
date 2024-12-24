import React from 'react';
import Chart from 'react-apexcharts';
import DashboardCard from '../../../components/shared/DashboardCard';

const MaintenanceRequestsSummary = () => {
  const options = {
    chart: { type: 'pie' },
    labels: ['Pending', 'In Progress', 'Resolved'],
  };

  const series = [12, 8, 20]; // Replace with dynamic data

  return (
    <DashboardCard title="Maintenance Requests Summary">
      <Chart options={options} series={series} type="pie" height={350} />
    </DashboardCard>
  );
};

export default MaintenanceRequestsSummary;
