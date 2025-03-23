import { fetchAllUsers } from "@/api/users/users";
import { useEffect } from "react";
import { useState } from "react";
import { deleteUser } from "@/api/users/users";
import { Table } from 'lucide-react';

interface User {
  email: string;
  insertedOn: number[];
  isActive: boolean;
  password: string;
  roles: { roleId: number; roleName: string }[];
  updatedOn: number[];
  userId: number;
  userName: string;
}

export default function UserCard() {
  const [allUsers, setAllusers] = useState<User[] | null>(null);
  useEffect(() => {
    fetchAllUsers().then((data) => {
      console.log(data);
      setAllusers(data);
    });
  }, []);

  const handleDeleteUser = (userId: number) => {
    deleteUser(userId).then((data) => {
      console.log(data);
      fetchAllUsers().then((data) => {
        console.log(data);
        setAllusers(data);
      });
    });
  };
  return (
    <div>
    <h1 className="text-xl font-bold mb-4">Users List</h1>
    
    <div className="overflow-x-auto rounded-lg shadow-md">
      <table className="w-full bg-white border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="py-3 px-4 font-semibold text-gray-800 border-b">Username</th>
            <th className="py-3 px-4 font-semibold text-gray-800 border-b">Email</th>
            <th className="py-3 px-4 font-semibold text-gray-800 border-b">Role</th>
            <th className="py-3 px-4 font-semibold text-gray-800 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {allUsers?.map((user) => (
            <tr key={user.userId} className="hover:bg-gray-50 border-b">
              <td className="py-4 px-4">{user.userName}</td>
              <td className="py-4 px-4">{user.email}</td>
              <td className="py-4 px-4">{user.roles[0].roleName}</td>
              <td className="py-4 px-4">
                <button
                  onClick={() => handleDeleteUser(user.userId)}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold py-1 px-3 rounded text-sm transition-colors"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  );
}
