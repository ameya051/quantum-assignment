import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
import type { RegisterFormData, LoginFormData } from "@/schemas/auth";
import type { AuthResponse } from "@/types/auth";

export const useLoginMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: LoginFormData) => {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Login failed");
      }

      return response.json() as Promise<AuthResponse>;
    },
    onSuccess: (data) => {
      // Save auth data to localStorage
      localStorage.setItem("token", data?.data?.token || "");
      localStorage.setItem("user", JSON.stringify(data?.data?.user));

      toast("Login Successful");
      navigate({ to: "/" });
    },
    onError: (error: Error) => {
      console.log("Login error:", error);

      toast(error.message || "Login Failed");
    },
  });
};

export const useRegisterMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: RegisterFormData) => {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Registration failed");
      }

      return response.json() as Promise<AuthResponse>;
    },
    onSuccess: (data) => {
      // Save auth data to localStorage
      localStorage.setItem("token", data?.data?.token || "");
      localStorage.setItem("user", JSON.stringify(data?.data?.user));

      toast("Registration Successful");
      navigate({ to: "/" });
    },
    onError: (error: Error) => {
      console.log("Registration error:", error);

      toast(error.message || "Registration Failed");
    },
  });
};
