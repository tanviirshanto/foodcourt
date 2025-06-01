"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FaKey } from "react-icons/fa";
import { signIn } from "next-auth/react";
import Link from "next/link"; // ✅ Correct Link import
import { AiOutlineLoading3Quarters } from "react-icons/ai"; // Optional spinner icon

export default function LoginComponent() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({ email: "", password: "" });

  const loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const callback = await signIn("credentials", {
      ...data,
      redirect: false,
    });

    if (callback?.error) {
      toast.error(callback.error);
      setIsLoading(false); // ✅ Reset loading
    }

    if (callback?.ok && !callback?.error) {
      toast.success("Logged in successfully!");
      router.push("/");
    }
  };

  return (
    <div className="flex h-screen flex-1 flex-col justify-center px-6 pt-2 pb-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
          Login to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-3" onSubmit={loginUser}>
          <label
            htmlFor="email"
            className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
          >
            Your Email
          </label>
          <div className="relative mb-6">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
              </svg>
            </div>
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="name@email.com"
            />
          </div>

          <label
            htmlFor="password"
            className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <div className="relative mb-6">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <FaKey className="text-gray-500 dark:text-gray-400" />
            </div>
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="********"
            />
          </div>

          <div className="flex items-center justify-end">
            <div className="text-sm">
              <a
                href="#"
                className="font-semibold text-green-600 hover:text-green-500"
              >
                Forgot password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full justify-center items-center gap-2 rounded-md bg-green-600 px-3 py-2 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading && (
                <AiOutlineLoading3Quarters className="animate-spin h-5 w-5" />
              )}
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>

        <div className="mt-4 text-lg text-center">
          Don{"'"}t have an account?{" "}
          <Link href="/register" className="text-indigo-600 underline">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
