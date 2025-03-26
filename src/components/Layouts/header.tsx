import { imgHelper } from "@/lib/image-helper";
import { roboto } from "@/lib/fonts";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function SeerTechLogo() {
  const [user, setUser] = useState<string | null>(null);
  const router = useRouter();
  useEffect(() => {
    const user = localStorage.getItem("user");
    setUser(user);
  }, []);
  return (
    <header
      className={`${roboto.className} sticky top-0 w-full flex justify-between items-center bg-blue-500 py-3 px-4 shadow-md z-20`}
    >
      <button
        id="menu-toggle"
        className="md:hidden text-white"
        onClick={() =>
          document
            .getElementById("sidebar")
            ?.classList.toggle("-translate-x-full")
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 7.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
          />
        </svg>
      </button>

      <div className="flex items-center gap-2">
        <img
          src={imgHelper.seertechsystemsLogo}
          alt="Company Logo"
          className="w-6 h-6 object-cover rounded-full"
        />
        <h3 className="text-white font-semibold">SeerTech Systems</h3>
      </div>
      <div
        className="flex items-center gap-2"
        onClick={() => setTimeout(() => router.push("/settings"), 1000)}
      >
        {
          <h3 className="text-white font-semibold">
            {user?.replace('"', "").replace('"', "").charAt(0).toUpperCase()}
            {user?.slice(2, user.length - 1)}
          </h3>
        }
        <img
          src={imgHelper.userProfile}
          alt="admin_icon"
          className="w-5 h-5 md:w-10 md:h-10 rounded-full"
        />
      </div>
    </header>
  );
}
