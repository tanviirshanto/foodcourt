"use client";

import { useEffect, useState } from "react";
import { User } from "@/types/user";
import uniqid from "uniqid";
export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users || []);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading users...</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">All Users</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div key={uniqid()} className="bg-white p-4 rounded shadow">
            <h3 className="text-xl font-semibold">{user.name}</h3>
            <p className="text-sm text-gray-600">{user.email}</p>
            {user.contact && <p className="text-sm">📞 {user.contact}</p>}
            {user.address && <p className="text-sm">🏠 {user.address}</p>}
            <p className="text-sm">
              ✅ Verified: {user.isVerified ? "Yes" : "No"}
            </p>
            {/* <p className="text-sm">👤 Role: {user.role || "user"}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
}
