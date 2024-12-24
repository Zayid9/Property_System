import React from 'react';
import Chart from 'react-apexcharts';
import DashboardCard from '../../../components/shared/DashboardCard';

const RevenueChart = () => {
  const options = {
    chart: { type: 'line', height: 350 },
    xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] },
    dataLabels: { enabled: false },
  };

  const series = [
    { name: 'Rent Collected', data: [5000, 7000, 8000, 6000, 9000, 10000] }, // Replace with dynamic data
  ];

  return (
    <DashboardCard title="Revenue Chart">
      <Chart options={options} series={series} type="line" height={350} />
    </DashboardCard>
  );
};

export default RevenueChart;
