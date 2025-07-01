import { Outlet } from 'react-router-dom';
import { DashboardLayout, type SidebarFooterProps } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Footer from '../components/Footer';

import "../styles/App.css";

export default function DashboardLayoutWrapper() {

	function SidebarFooter({ mini }: SidebarFooterProps) {
		return (
			<Footer mini={mini} />
		);
	}

	return (
		<DashboardLayout
			slots={{
				sidebarFooter: SidebarFooter,
			}}>
			<PageContainer title=''>
				<Outlet />
			</PageContainer>
		</DashboardLayout >
	);
}
