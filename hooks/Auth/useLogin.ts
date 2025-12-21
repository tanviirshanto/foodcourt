"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

type LoginData = { email: string; password: string };

export function useLogin() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<LoginData>({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");

  const loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError("");

    const callback = await signIn("credentials", {
      ...data,
      redirect: false,
    });

    if (callback?.error) {
      toast.error(callback.error);
      setLoginError("Invalid email or password.");
      setIsLoading(false);
    }

    if (callback?.ok && !callback?.error) {
      toast.success("Logged in successfully!");
      router.push("/");
    }
  };

  return { isLoading, data, setData, loginError, loginUser };
}
