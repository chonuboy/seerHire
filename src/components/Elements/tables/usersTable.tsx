import { useEffect } from "react";
import { fetchAllUsers } from "@/api/users/users";
import { Table } from "./table";
import { useState } from "react";
import { usersColumn } from "@/lib/models/client";

export default function UsersTable() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchAllUsers().then((res) => {
      setUsers(res);
      console.log(res);
    });
  }, []);
  return (
    <div className="p-4 space-y-4">
      <h1 className="font-semibold text-xl">Users</h1>
      <Table data={users} columns={usersColumn} column={usersColumn.length}  />
    </div>
  );
}
