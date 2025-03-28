import { fetchAllUsers } from "@/api/users/users";
import { useEffect } from "react";
import { useState } from "react";
import { createUser } from "@/api/users/users";
import { Popup } from "./popup";
import { useRouter } from "next/router";

interface User {
  email: string;
  isActive: boolean;
  password: string;
  roles: { roleId: number | undefined; roleName?: string }[];
  userName: string;
}

export default function UserCard() {
  const [allUsers, setAllusers] = useState<User[] | null>(null);
  const [isUserAdded, setIsUserAdded] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    fetchAllUsers().then((data) => {
      setAllusers(data);
    });
  }, [isUserAdded]);

  const [formData, setFormData] = useState<User>({
    userName: "",
    password: "",
    email: "",
    roles: [
      {
        roleId: undefined,
      },
    ],
    isActive: true,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const roleId = parseInt(e.target.value);
    setFormData((prev) => ({
      ...prev,
      roles: [{ roleId }],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createUser(formData).then((data) => {
      setIsUserAdded(false);
    });
  };

  return (
    <div className="space-y-4 text-xs md:text-base">
      {allUsers == null ? (
        <div>
          <h2>
            No Users
          </h2>
        </div>
      ) : (
        <div>
          <div className="flex justify-between my-4 items-center">
            <h1 className="text-xl font-bold">Users List</h1>
            <button
              className="bg-blue-500 text-white rounded-md px-4 py-2"
              onClick={() => setIsUserAdded(true)}
            >
              Add User
            </button>
          </div>

          <div className="overflow-x-scroll rounded-lg shadow-md">
            <table className="w-full bg-white border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="py-3 px-4 font-semibold text-gray-800 border-b">
                    Username
                  </th>
                  <th className="py-3 px-4 font-semibold text-gray-800 border-b">
                    Email
                  </th>
                  <th className="py-3 px-4 font-semibold text-gray-800 border-b">
                    Role
                  </th>
                </tr>
              </thead>
              <tbody>
                {allUsers !== null &&
                  allUsers?.length > 0 &&
                  allUsers?.map((user, index) => (
                    <tr key={index} className="hover:bg-gray-50 border-b">
                      <td className="py-4 px-4">{user.userName}</td>
                      <td className="py-4 px-4">{user.email}</td>
                      <td className="py-4 px-4">{user.roles[0].roleName}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {isUserAdded && (
              <Popup onClose={() => setIsUserAdded(false)}>
                <div className="py-12 px-4 sm:px-6 lg:px-8 mt-6">
                  <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                      Add New User
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label
                          htmlFor="userName"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Username
                        </label>
                        <input
                          type="text"
                          id="userName"
                          name="userName"
                          value={formData.userName}
                          onChange={handleChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          required
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          required
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          required
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="role"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Role
                        </label>
                        <select
                          id="role"
                          name="role"
                          value={formData.roles[0].roleId}
                          onChange={handleRoleChange}
                          className="mt-1 w-full py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        >
                          <option value="1">SuperAdmin</option>
                          <option value="2">Recruiter</option>
                        </select>
                      </div>

                      <div className="space-y-4">
                        <button
                          type="submit"
                          className="w-full bg-blue-500 text-white py-1 rounded-md"
                        >
                          Submit
                        </button>
                        <button
                          className="w-full bg-red-500 text-white py-1 rounded-md"
                          onClick={() => {
                            setIsUserAdded(false);
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </Popup>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
