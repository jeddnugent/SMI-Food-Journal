import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from "../App";
import DashboardLayoutWrapper from './DashboardLayout';
import CreateEntrys from './CreateEntrys';
import JournalOverview from './JournalOverview';
import LoginSignUp from './LoginSignUp';
import { UserProvider } from '../contexts/UserContext';
import ProtectedRoute from '../components/ProtectedRoute';



const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        element: <DashboardLayoutWrapper />,
        children: [
          { path: '', element: <ProtectedRoute><CreateEntrys /></ProtectedRoute> },
          { path: 'create-new-entry', element: <ProtectedRoute><CreateEntrys /></ProtectedRoute> },
          { path: 'journal-overview', element: <ProtectedRoute><JournalOverview /></ProtectedRoute> },
          { path: 'login-signup', element: <LoginSignUp /> }
        ],
      },
      //  Can move login outside of dashboard if need,
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </StrictMode>
);
