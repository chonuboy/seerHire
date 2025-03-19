import SeertechLogo from "@/components/Layouts/header";
import SideNav from "@/components/Layouts/sidenav";
import Dashboard from "@/components/Elements/dashboard/dashBoard";
import ProtectedRoute from "@/Features/protectedRoute";

export default function Home() {
  return (
    <ProtectedRoute>
      <main className="min-h-screen">
        <SeertechLogo />
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
          <div className="w-full flex-none md:w-64">
            <SideNav />
          </div>
          <div className="flex-grow p-4 md:overflow-y-auto md:p-6">
            <Dashboard></Dashboard>
          </div>
        </div>
        <footer className="bg-blue-500 py-1 px-2 w-full text-white sticky bottom-0 z-10">
          <p className="text-center">
            &copy; {new Date().getFullYear()} Seertech. All rights reserved.
          </p>
        </footer>
      </main>
    </ProtectedRoute>
  );
}
