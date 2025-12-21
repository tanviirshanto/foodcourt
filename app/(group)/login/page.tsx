"use client";

import AuthCard from "@/components/Auth/AuthCard";
import AuthFooter from "@/components/Auth/AuthFooter";
import AuthShell from "@/components/Auth/AuthShell";
import ErrorBanner from "@/components/Auth/ErrorBanner";
import SubmitButton from "@/components/Auth/SubmitButton";
import TextField from "@/components/Auth/TextField";
import { useLogin } from "@/hooks/Auth/useLogin";
import { FaKey } from "react-icons/fa";
import AuthHeader from "@/components/Auth/AuthHeader";

export default function LoginComponent() {
  const { isLoading, data, setData, loginError, loginUser } = useLogin();

  return (
    <AuthShell>
      <AuthCard>
        <AuthHeader
          title="Welcome back"
          subtitle="Log in to continue to your account"
          icon={<FaKey className="text-white text-xl" />}
        />

        <ErrorBanner message={loginError} />

        <form className="mt-6 space-y-4" onSubmit={loginUser}>
          <TextField
            label="Email"
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={data.email}
            onChange={(email) => setData({ ...data, email })}
            placeholder="name@email.com"
            leftIcon={
              <svg
                className="w-4 h-4 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
              </svg>
            }
          />

          <TextField
            label="Password"
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={data.password}
            onChange={(password) => setData({ ...data, password })}
            placeholder="********"
            leftIcon={<FaKey className="text-gray-400" />}
          />

          <SubmitButton
            isLoading={isLoading}
            disabled={isLoading}
            text="Login"
            loadingText="Logging in..."
          />
        </form>

        <AuthFooter
          question={`Don' t have an account?`}
          linkText="Register"
          href="/register"
        />
      </AuthCard>
    </AuthShell>
  );
}
