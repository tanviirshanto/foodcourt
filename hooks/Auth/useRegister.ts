"use client";

import { useMemo, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

type RegisterData = { name: string; email: string; password: string };

export function useRegister() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [data, setData] = useState<RegisterData>({
    name: "",
    email: "",
    password: "",
  });

  const isFormValid = useMemo(() => {
    return data.name.trim() && data.email.trim() && data.password.trim();
  }, [data]);

  const registerUser = async (e: React.FormEvent<HTMLFormElement>) => {
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

  return {
    isLoading,
    showPass,
    setShowPass,
    data,
    setData,
    isFormValid,
    registerUser,
  };
}
