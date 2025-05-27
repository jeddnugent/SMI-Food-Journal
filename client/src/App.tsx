import "./styles/App.css";
import { BrowserRouter } from 'react-router-dom';
import CreateEntrys from './Pages/CreateEntrys';
import LoginSignUp from "./components/LoginSignUp";
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, type Navigation } from "@toolpad/core/AppProvider";
import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import JournalOverview from "./Pages/JournalOverview";

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
