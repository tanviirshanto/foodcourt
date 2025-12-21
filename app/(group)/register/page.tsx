"use client";

import { FaKey } from "react-icons/fa";
import { FiUser, FiMail } from "react-icons/fi";

import AuthShell from "@/components/Auth/AuthShell";
import AuthCard from "@/components/Auth/AuthCard";
import AuthHeader from "@/components/Auth/AuthHeader";
import TextField from "@/components/Auth/TextField";
import PasswordField from "@/components/Auth/PasswordField";
import SubmitButton from "@/components/Auth/SubmitButton";
import AuthFooter from "@/components/Auth/AuthFooter";

import { useRegister } from "@/hooks/Auth/useRegister";

export default function RegisterComponent() {
  const {
    isLoading,
    showPass,
    setShowPass,
    data,
    setData,
    isFormValid,
    registerUser,
  } = useRegister();

  return (
    <AuthShell>
      <AuthCard>
        <AuthHeader
          title="Get started"
          subtitle="Create your account in seconds"
          icon={<FaKey className="text-white text-xl" />}
        />

        <form className="mt-6 space-y-4" onSubmit={registerUser}>
          <TextField
            label="Name"
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={data.name}
            onChange={(name) => setData({ ...data, name })}
            placeholder="Your name"
            leftIcon={<FiUser className="text-gray-400" />}
          />

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
            leftIcon={<FiMail className="text-gray-400" />}
          />

          <PasswordField
            value={data.password}
            onChange={(password) => setData({ ...data, password })}
            show={showPass}
            toggleShow={() => setShowPass((s) => !s)}
          />

          <SubmitButton
            isLoading={isLoading}
            disabled={isLoading || !isFormValid}
            text="Create account"
            loadingText="Creating..."
          />
        </form>

        <AuthFooter
          question="Already have an account?"
          linkText="Login"
          href="/login"
        />
      </AuthCard>
    </AuthShell>
  );
}
