import { createBrowserRouter } from 'react-router-dom';

import AppLayout from '../layouts/AppLayout/AppLayout';

import AboutPage from '../pages/AboutPage/AboutPage';
import BreakerFamiliesPage from '../pages/BreakerFamiliesPage/BreakerFamiliesPage';
import BreakersPage from '../pages/BreakersPage/BreakersPage';
import DashboardPage from '../pages/DashboardPage/DashboardPage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import SelectivityExplorerPage from '../pages/SelectivityExplorerPage/SelectivityExplorerPage';
import SelectivityRecordsPage from '../pages/SelectivityRecordsPage/SelectivityRecordsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,

    children: [
      {
        index: true,
        element: <DashboardPage />,
      },

      {
        path: 'explorer',
        element: <SelectivityExplorerPage />,
      },

      {
        path: 'breaker-families',
        element: <BreakerFamiliesPage />,
      },

      {
        path: 'breakers',
        element: <BreakersPage />,
      },

      {
        path: 'selectivity-records',
        element: <SelectivityRecordsPage />,
      },

      {
        path: 'about',
        element: <AboutPage />,
      },

      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);