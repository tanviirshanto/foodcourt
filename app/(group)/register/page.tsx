"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { FaKey } from "react-icons/fa";
import { Link } from "nextjs13-progress";

export default function RegisterComponent() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({ name: "", email: "", password: "" });

  const registerUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await axios.post("/api/register", data);
      toast.success("Registration successful. Please verify your email.");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.response?.data || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <form
        onSubmit={registerUser}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Register</h2>

        <input
          type="text"
          placeholder="Name"
          required
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          className="input-field"
        />

        <input
          type="email"
          placeholder="Email"
          required
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          className="input-field"
        />

        <div className="relative">
          <FaKey className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="password"
            placeholder="Password"
            required
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            className="input-field pl-10"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
        >
          {isLoading ? "Registering..." : "Register"}
        </button>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
