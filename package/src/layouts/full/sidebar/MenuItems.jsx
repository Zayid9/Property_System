import { IconBuilding, IconUsers, IconTools, IconLayoutDashboard, IconFileReport, IconUserPlus} from '@tabler/icons-react';

const Menuitems = [
  { navlabel: true, subheader: 'Home' },
  { id: 'dashboard', title: 'Dashboard', icon: IconLayoutDashboard, href: '/dashboard' },
  { navlabel: true, subheader: 'Management' },
  { id: 'properties', title: 'Properties', icon: IconBuilding, href: '/properties' },
  { id: 'tenants', title: 'Tenants', icon: IconUsers, href: '/tenants' },
  { navlabel: true, subheader: 'Agreements' },
  { id: 'leaseManagement', title: 'Lease Agreement', icon: IconFileReport, href: '/leaseManagement' },
  { navlabel: true, subheader: 'Maintenance' },
  { id: 'maintenance', title: 'Maintenance', icon: IconTools, href: '/maintenance' },
  { navlabel: true, subheader: 'Reports' },
  { id: 'reports', title: 'Reports', icon: IconFileReport, href: '/reports' },
  { navlabel: true, subheader: 'Users' },
  { id: 'register', title: 'Register User', icon: IconUserPlus, href: '/register' },
];

export default Menuitems;
