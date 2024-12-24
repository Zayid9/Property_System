import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import PrivateRoute from '../utils/PrivateRoute';

const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));
const Dashboard = Loadable(lazy(() => import('../views/dashboard/Dashboard')));
const Properties = Loadable(lazy(() => import('../views/properties/Properties')));
const Tenants = Loadable(lazy(() => import('../views/tenants/Tenants')));
const LeaseManagement = Loadable(lazy(() => import('../views/LeaseManagement/leaseManagement')));
const Maintenance = Loadable(lazy(() => import('../views/maintenance/Maintenance')));
const Reports = Loadable(lazy(() => import('../views/Reports/reports')));
const Login = Loadable(lazy(() => import('../views/authentication/Login')));
const AdminOnlyRegister = Loadable(lazy(() => import('../views/register/AdminOnlyRegister')));
const Error = Loadable(lazy(() => import('../views/authentication/Error')));

const Router = [
  {
    path: '/',
    element: <FullLayout />, 
    children: [
      { path: '/', element: <Navigate to="/auth/login" /> },
      { path: '/dashboard', element: <PrivateRoute><Dashboard /></PrivateRoute> },
      { path: '/properties', element: <PrivateRoute><Properties /></PrivateRoute> },
      { path: '/tenants', element: <PrivateRoute><Tenants /></PrivateRoute> },
      { path: '/leaseManagement', element: <PrivateRoute><LeaseManagement /></PrivateRoute> },
      { path: '/maintenance', element: <PrivateRoute><Maintenance /></PrivateRoute> },
      { path: '/reports', element: <PrivateRoute><Reports /></PrivateRoute> },
      { path: '/register', element: <PrivateRoute><AdminOnlyRegister /></PrivateRoute> },
    ],
  },
  {
    path: '/auth',
    element: <BlankLayout />, 
    children: [
      { path: 'login', element: <Login /> },
      { path: '404', element: <Error /> },
    ],
  },
];

export default Router;