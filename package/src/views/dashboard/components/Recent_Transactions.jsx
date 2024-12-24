import React from 'react';
import DashboardCard from '../../../components/shared/DashboardCard';
import { Timeline, TimelineItem, TimelineOppositeContent, TimelineSeparator, TimelineDot, TimelineContent } from '@mui/lab';

const RecentTransactions = () => {
  const transactions = [
    { time: '09:30 am', description: 'Payment received from John Doe - $1,200' },
    { time: '11:00 am', description: 'Payment received from Jane Smith - $1,500' },
  ];

  return (
    <DashboardCard title="Recent Transactions">
      <Timeline>
        {transactions.map((tx, index) => (
          <TimelineItem key={index}>
            <TimelineOppositeContent>{tx.time}</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="primary" />
            </TimelineSeparator>
            <TimelineContent>{tx.description}</TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </DashboardCard>
  );
};

export default RecentTransactions;
