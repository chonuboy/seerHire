import SeertechLogo from "@/components/Layouts/header";
import SideNav from "@/components/Layouts/sidenav";
import Dashboard from "@/components/Elements/dashboard/dashBoard";
import ProtectedRoute from "@/Features/protectedRoute";
import UserCard from "@/components/Elements/cards/userCard";

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
            <UserCard></UserCard>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
