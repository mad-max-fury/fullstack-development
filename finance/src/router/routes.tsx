import { lazy, Suspense } from 'react';
import { Navigate } from 'react-router-dom';

const Overview = lazy(() => import('../pages/dashboard/overview'));
const Transactions = lazy(() => import('../pages/dashboard/transactions'));
const Bills = lazy(() => import('../pages/dashboard/bills'));
const Budgets = lazy(() => import('../pages/dashboard/budgets'));
const Pots = lazy(() => import('../pages/dashboard/pots'));
const Login = lazy(() => import('../pages/auth/login'));
const Signup = lazy(() => import('../pages/auth/signup'));
const Components = lazy(() => import('../pages/appComponents'));
const DashboardLayout = lazy(
  () => import('../components/layout/DashboardLayout'),
);
const AuthLayout = lazy(() => import('../components/layout/AuthLayout'));
const ProtectedLayout = lazy(
  () => import('../components/layout/Protectedlayout'),
);

const Loader = () => <div>Loading...</div>;

const appComponentsRoute = [
  {
    path: 'components',
    element: <Components />,
  },
];

const authRoutes = [
  {
    path: '',
    element: (
      <Suspense fallback={<Loader />}>
        <AuthLayout />
      </Suspense>
    ),
    children: [
      {
        path: '',
        element: <Navigate to="/login" replace />,
      },
      {
        path: 'login',
        element: (
          <Suspense fallback={<Loader />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: 'signup',
        element: (
          <Suspense fallback={<Loader />}>
            <Signup />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: <Navigate to="/login" replace />,
      },
    ],
  },
];

// Main application routes
const dashboardRoutes = [
  {
    path: '/dashboard',
    element: (
      <Suspense fallback={<Loader />}>
        <ProtectedLayout />
      </Suspense>
    ),
    children: [
      {
        path: '',
        element: <Navigate to="overview" replace />,
      },
      {
        path: '',
        element: (
          <Suspense fallback={<Loader />}>
            <DashboardLayout />
          </Suspense>
        ),
        children: [
          {
            path: 'overview',
            element: (
              <Suspense fallback={<Loader />}>
                <Overview />
              </Suspense>
            ),
          },
          {
            path: 'transactions',
            element: (
              <Suspense fallback={<Loader />}>
                <Transactions />
              </Suspense>
            ),
          },
          {
            path: 'bills',
            element: (
              <Suspense fallback={<Loader />}>
                <Bills />
              </Suspense>
            ),
          },
          {
            path: 'budgets',
            element: (
              <Suspense fallback={<Loader />}>
                <Budgets />
              </Suspense>
            ),
          },
          {
            path: 'pots',
            element: (
              <Suspense fallback={<Loader />}>
                <Pots />
              </Suspense>
            ),
          },
          {
            path: '*',
            element: <Navigate to="overview" replace />,
          },
        ],
      },
    ],
  },
];

export { authRoutes, dashboardRoutes, appComponentsRoute };
