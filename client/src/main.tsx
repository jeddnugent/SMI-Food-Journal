import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from "./App";
import DashboardLayoutWrapper from './Pages/DashboardLayout';
import CreateEntrys from './Pages/CreateEntrys';
import JournalOverview from './Pages/JournalOverview';
import LoginSignUp from './Pages/LoginSignUp';
import { UserProvider } from './contexts/UserContext';



const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        element: <DashboardLayoutWrapper />,
        children: [
          { path: 'create-new-entry', element: <CreateEntrys /> },
          { path: 'journal-overview', element: <JournalOverview /> },
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
