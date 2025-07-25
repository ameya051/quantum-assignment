import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import type { RegisterFormData, LoginFormData } from "@/schemas/auth";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: async (data: LoginFormData) => {
      const response = await fetch(`${process.env.BACKEND_BASE_URL}/api/v1/auth/login`, {
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

      return response.json();
    },
    onSuccess: () => {
      toast("Login Successful");
    },
    onError: (error: Error) => {
      toast(error.message || "Login Failed");
    },
  });
};

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: async (data: RegisterFormData) => {
      const response = await fetch(`${process.env.BACKEND_BASE_URL}/api/v1/auth/register`, {
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

      return response.json();
    },
    onSuccess: () => {
      toast("Registration Successful");
    },
    onError: (error: Error) => {
      toast(error.message || "Registration Failed");
    },
  });
};
