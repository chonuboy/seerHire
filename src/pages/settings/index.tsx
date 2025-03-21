import MainLayout from "@/components/Layouts/layout";
import ContentHeader from "@/components/Layouts/content-header";
import { useEffect } from "react";
import { useState } from "react";

export default function Settings() {
  const [user, setUser] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  useEffect(() => {
    const user = localStorage.getItem("user");
    const userRole = localStorage.getItem("userRole");
    setUserRole(userRole);
    setUser(user);
  });
  return (
    <MainLayout>
      <ContentHeader title="Settings" />
      <div>
        <div className="border border-gray-200 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">
              {user?.replace('"', "").replace('"', "").charAt(0).toUpperCase()}
              {user?.slice(2, user.length - 1)}
            </h2>
            <h2 className="text-md text-blue-500 font-semibold">
              {userRole
                ?.replace('"', "")
                .replace('"', "")
                .charAt(0)
                .toUpperCase()}
              {userRole?.slice(2, userRole.length - 1)}
            </h2>
          </div>
        </div>

        {/* Personal Information Section */}
        <div className="border border-gray-200 rounded-xl p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">
              Personal Information
            </h2>
            <button className="bg-blue-500 text-white px-4 py-1 rounded-md border-2 border-blue-500 hover:bg-white hover:text-blue-500 hover:shadow-lg transition duration-200 box-border">
              Edit
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">First Name</p>
              <p className="text-gray-800">{user?.replace('"', "").replace('"', "").charAt(0).toUpperCase()}{user?.slice(2, user.length - 1)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Email address</p>
              <p className="text-gray-800">{user?.replace('"', "").replace('"', "").charAt(0).toUpperCase()}{user?.slice(2, user.length - 1)}@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
