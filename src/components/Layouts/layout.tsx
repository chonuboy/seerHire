import SeertechLogo from '@/components/Layouts/header';
import SideNav from '@/components/Layouts/sidenav';


export default function MainLayout({ children }: { children: React.ReactNode }) {
	return (
		<main className="min-h-screen">
			<SeertechLogo />
			<div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
				<div className="w-full flex-none cts-sidebar">
					<SideNav />
				</div>
				<div className="flex-grow p-4 md:overflow-y-auto md:p-6 cts-content-section">{children}</div>
			</div>
		</main>
	);
}