import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import RootLayout from '@pages/RootLayout';
import ErrorPage from '@pages/Error';

import HomeLayout from '@pages/HomeLayout';
import HomePage from '@pages/Home';
import ProfilePage from '@pages/Profile';
import NotificationPage from '@pages/Notification';
import NotePage from '@pages/Note';

import AuthenticationPage from '@pages/Authentication';
import { loader as logoutLoader } from '@pages/Logout';

import StyledApp from '@styles/App-styled';
import { tokenLoader, checkTokenLoader, checkIsTokenLoader } from '@utils/auth';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: 'root',
    loader: tokenLoader,
    children: [
      {
        path: '/',
        element: <HomeLayout />,
        loader: checkTokenLoader,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: 'profile',
            element: <ProfilePage />,
          },
          {
            path: 'notification',
            element: <NotificationPage />,
          },
          {
            path: 'note',
            element: <NotePage />,
          },
        ],
      },
      {
        path: 'auth',
        element: <AuthenticationPage />,
        loader: checkIsTokenLoader,
      },
      {
        path: 'logout',
        loader: logoutLoader,
      },
    ],
  },
]);

const App = () => {
  return (
    <StyledApp>
      <RouterProvider router={router} />
    </StyledApp>
  );
};

export default App;
