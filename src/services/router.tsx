import { createBrowserRouter } from 'react-router-dom';
import CreateEvent from '../components/CreateEvent';
import ViewEvents from '../components/ViewEvents';
import Layout from '../components/Layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <CreateEvent />,
      },
      {
        path: '/events',
        element: <ViewEvents />,
      },
    ],
  },
]);
