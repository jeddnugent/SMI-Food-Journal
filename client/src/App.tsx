import "./styles/App.css"
import { BrowserRouter } from 'react-router-dom';
import CreateEntrys from './Pages/CreateEntrys';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, type Navigation } from "@toolpad/core/AppProvider";
import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";

function App() {

	const NAVIGATION: Navigation = [
		// {
		//   kind: 'header',
		//   title: 'Main items',
		// },
		{
			segment: 'CreateEntrys',
			title: 'Page',
			icon: <DashboardIcon />,
		},
	];

	const SMITheme = createTheme({
		cssVariables: {
			colorSchemeSelector: "data-toolpad-color-scheme",
		},
		colorSchemes: { light: true },
		breakpoints: {
			values: {
				xs: 0,
				sm: 600,
				md: 600,
				lg: 1200,
				xl: 1536,
			},
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
						homeUrl: '/CreateEntrys',
					}}
				>
					<DashboardLayout>
						<Routes>
							<Route path="/" element={<Navigate to="/CreateEntrys" replace />} />
							<Route path="/CreateEntrys" element={<CreateEntrys />} />
						</Routes>
					</DashboardLayout>
				</AppProvider>
			</BrowserRouter>
		</div>
	);
}

export default App;
