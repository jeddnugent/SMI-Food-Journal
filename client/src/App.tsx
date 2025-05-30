import "./styles/App.css";

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
	const { user, setUser } = useUser();
	const navigate = useNavigate();

	const SMITheme = createTheme({
		colorSchemes: { light: true },
		palette: {
			primary: {
				main: '#2d2f79',
				contrastText: '#000000',
			},
		},
	});
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
			title: 'Overview',
			icon: <CalendarMonthOutlinedIcon />,
		},
	];

	const handleLogout = async () => {
		try {
			await logout();
			setUser(null);
		} catch (err) {
			console.error('Logout failed', err);
		}
	};

	const account = user
		? {
			user: {
				name: user.f_name,
				email: user.email || '',
			},
		}
		: null;

	const authentication = useMemo(() => {
		return {
			signIn: () => {
				if (!user) {
					navigate('/login-signup');
				} else {
					const session: Session = {
						user: {
							name: user.f_name,
							email: user.email,
						},
					};
					return session;
				}
			},
			signOut: async () => {
				handleLogout();
			},
		};
	}, []);

	return (
		<ReactRouterAppProvider
			navigation={NAVIGATION}
			theme={SMITheme}
			session={account}
			authentication={authentication}
			branding={{
				logo: <img src="https://successfulminds.com.au/wp-content/uploads/2019/09/web-200.png" alt="SMI logo" />,
				title: 'SMI Food Journal',
				homeUrl: '/create-new-entry',
			}}
		>
			<Outlet />
		</ReactRouterAppProvider >
	);
}

export default App;
