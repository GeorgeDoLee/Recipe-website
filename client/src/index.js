import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import {Toaster} from 'react-hot-toast';

import './index.css';
import Home from './pages/Home';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import store from './store/store';
import ProfilePage from './pages/Profile/ProfilePage';
import EditProfile from './pages/Profile/EditProfile';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/sign-in',
    element: <SignInPage />
  },
  {
    path: '/sign-up',
    element: <SignUpPage />
  },
  {
    path: '/profile',
    element: <ProfilePage />,
    children: [ 
      {
        path: '/profile/edit',
        element: <EditProfile />
      }
    ] 
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <Toaster />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
