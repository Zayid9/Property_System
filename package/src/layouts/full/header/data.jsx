import img1 from 'src/assets/images/profile/tenant-1.jpg';
import img2 from 'src/assets/images/profile/tenant-2.jpg';
import img3 from 'src/assets/images/profile/tenant-3.jpg';
import img4 from 'src/assets/images/profile/tenant-4.jpg';

import icon1 from 'src/assets/images/svgs/icon-account.svg';
import icon2 from 'src/assets/images/svgs/icon-payment.svg';
import icon3 from 'src/assets/images/svgs/icon-maintenance.svg';

import ddIcon1 from 'src/assets/images/svgs/icon-dd-rent.svg';
import ddIcon2 from 'src/assets/images/svgs/icon-dd-maintenance.svg';
import ddIcon3 from 'src/assets/images/svgs/icon-dd-revenue.svg';
import ddIcon4 from 'src/assets/images/svgs/icon-dd-leases.svg';
import ddIcon5 from 'src/assets/images/svgs/icon-dd-tenants.svg';
import ddIcon6 from 'src/assets/images/svgs/icon-dd-notifications.svg';

//
// Notifications dropdown
//
const notifications = [
  { avatar: img1, title: 'New Rent Payment Received', subtitle: 'John paid $1,200 for Apt 101.' },
  { avatar: img2, title: 'Maintenance Request Submitted', subtitle: 'Leaky faucet in Apt 202 reported.' },
  { avatar: img3, title: 'Lease Expiring Soon', subtitle: 'Jane’s lease ends in 30 days.' },
  { avatar: img4, title: 'Overdue Payment Reminder', subtitle: 'Adam’s rent is overdue by 5 days.' }
];

//
// Profile dropdown
//
const profile = [
  { href: '/user-profile', title: 'My Profile', subtitle: 'Account Settings', icon: icon1 },
  { href: '/payments', title: 'My Payments', subtitle: 'Rent & Fees', icon: icon2 },
  { href: '/maintenance', title: 'Maintenance Requests', subtitle: 'Track Your Requests', icon: icon3 }
];

// apps dropdown
const appsLink = [
  { href: '/rent-dashboard', title: 'Rent Dashboard', subtext: 'Manage rent collections', avatar: ddIcon1 },
  { href: '/maintenance-dashboard', title: 'Maintenance Dashboard', subtext: 'Track maintenance tasks', avatar: ddIcon2 },
  { href: '/revenue-report', title: 'Revenue Report', subtext: 'View income breakdowns', avatar: ddIcon3 },
  { href: '/lease-management', title: 'Lease Management', subtext: 'Handle tenant leases', avatar: ddIcon4 },
  { href: '/tenant-overview', title: 'Tenant Overview', subtext: 'View tenant details', avatar: ddIcon5 },
  { href: '/notifications', title: 'Notifications', subtext: 'Important updates', avatar: ddIcon6 }
];

// Data structures for dashboard widgets
export const properties = [
  { id: 1, address: '123 Main St', owner: 'John Doe', status: 'Occupied', rent: '$1000' },
  { id: 2, address: '456 Maple Ave', owner: 'Jane Smith', status: 'Available', rent: '$1200' }
];

export const leases = [
  { id: 1, tenant: 'Alice Brown', property: '123 Main St', status: 'Active', due: '2024-01-01' },
  { id: 2, tenant: 'Bob Green', property: '456 Maple Ave', status: 'Expiring', due: '2023-12-15' }
];

export const payments = [
  { id: 1, tenant: 'Alice Brown', amount: '$1000', date: '2023-11-01', status: 'Paid' },
  { id: 2, tenant: 'Bob Green', amount: '$1200', date: '2023-10-15', status: 'Overdue' }
];

export const maintenance = [
  { id: 1, property: '123 Main St', issue: 'Leaking faucet', status: 'In Progress' },
  { id: 2, property: '456 Maple Ave', issue: 'Broken window', status: 'Pending' }
];

export { notifications, profile, appsLink };
