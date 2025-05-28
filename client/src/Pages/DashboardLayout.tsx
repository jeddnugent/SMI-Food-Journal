import { Outlet } from 'react-router-dom';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';

import "../styles/App.css";

export default function DashboardLayoutWrapper() {
	return (
		<DashboardLayout>
			<PageContainer title=''>
				<Outlet />
			</PageContainer>
		</DashboardLayout >
	);
}
