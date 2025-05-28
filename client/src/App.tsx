import "../styles/App.css";

import { type Navigation, type Session } from "@toolpad/core/AppProvider";
import { createTheme } from "@mui/material/styles";
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { ReactRouterAppProvider } from '@toolpad/core/react-router';

import { useNavigate, Outlet } from 'react-router-dom';
import { useMemo } from "react";

import { useUser } from "./contexts/UserContext";
import { logout } from "./api/users";



function App() {

	const NAVIGATION: Navigation = [
		// {
		//   kind: 'header',
		//   title: 'Main items',
		// },
		{
			segment: 'create-new-entry',
			title: 'New Entry',
			icon: <PostAddOutlinedIcon />,
		},
		{
			segment: 'journal-overview',
			title: 'Journal Overview',
			icon: <CalendarMonthOutlinedIcon />,
		},
	];

const SMITheme = createTheme({
  colorSchemes: { light: true },
	palette: {
    primary: {
      main: '#2d2f79',
      contrastText: '#000000',
    },
    // Add more custom colors as needed
  },
});


	return (
		<div className="App">
			<BrowserRouter>
				<AppProvider
					navigation={NAVIGATION}
					theme={SMITheme}
					branding={{
						logo: <img src="https://successfulminds.com.au/wp-content/uploads/2019/09/web-200.png" alt="SMI logo" />,
						title: 'SMI Food Journal',
						homeUrl: '/',
					}}
				>
					<DashboardLayout>
						<Routes>
							<Route path="/" element={<Navigate to="/login-signup" replace />} />
							<Route path="/create-new-entry" element={<CreateEntrys />} />
							<Route path="/login-signup" element={<LoginSignUp />} />
							<Route path="/journal-overview" element={<JournalOverview />} />
						</Routes>
					</DashboardLayout>
				</AppProvider>
			</BrowserRouter>
		</div>
	);
}

export default App;
