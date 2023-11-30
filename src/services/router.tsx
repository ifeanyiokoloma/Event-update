import { createBrowserRouter } from 'react-router-dom';
import CreateEvent from '../pages/CreateEvent';
import ViewEvents from '../pages/Events';
import Layout from '../components/Layout';
import Event from '../pages/Event';
import { eventLoader, eventsLoader } from './functions';

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
        loader: eventsLoader,
      },
      {
        path: '/events/:eventId',
        element: <Event />,
        loader: eventLoader,
      },
    ],
  },
]);
