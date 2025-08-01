import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { User, Lock, AlertCircle } from "lucide-react";
import { loginSchema, type LoginFormData } from "@/schemas/auth";
import { useLoginMutation } from "@/apis/auth";
import { Link } from "@tanstack/react-router";

export const LoginForm = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const rememberMe = watch("rememberMe");

  const mutation = useLoginMutation();

  const onSubmit = (data: LoginFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}

        {/* Login Card */}
        <div className="bg-card p-8 shadow-glow border border-border/20">
          <div className="text-center -mt-14 mb-6">
            <div className="inline-block bg-primary text-primary-foreground px-12 py-3 font-semibold text-lg tracking-wide">
              SIGN IN
            </div>
          </div>
          {/* Avatar */}
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center border-2 border-zinc-500">
              <User className="w-12 h-12 text-muted-foreground" />
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Username Field */}
            <div className="space-y-2">
              <div className="relative">
                <div className="absolute left-0 top-0 h-full w-12 flex items-center justify-center border-r border-border/50">
                  <User className="w-5 h-5 text-muted-foreground" />
                </div>
                <Input
                  {...register("email")}
                  type="email"
                  placeholder="email"
                  className={`pl-14 h-14 bg-input border-border text-foreground placeholder:text-muted-foreground rounded-xl ${errors.email ? "border-destructive" : ""
                    }`}
                />
              </div>
              {errors.email && (
                <div className="flex items-center gap-2 text-destructive text-sm">
                  <AlertCircle className="w-4 h-4" />
                  {errors.email.message}
                </div>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="relative">
                <div className="absolute left-0 top-0 h-full w-12 flex items-center justify-center border-r border-border/50">
                  <Lock className="w-5 h-5 text-muted-foreground" />
                </div>
                <Input
                  {...register("password")}
                  type="password"
                  placeholder="password"
                  className={`pl-14 h-14 bg-input border-border text-foreground placeholder:text-muted-foreground rounded-xl ${errors.password ? "border-destructive" : ""
                    }`}
                />
              </div>
              {errors.password && (
                <div className="flex items-center gap-2 text-destructive text-sm">
                  <AlertCircle className="w-4 h-4" />
                  {errors.password.message}
                </div>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="rememberMe"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setValue("rememberMe", !!checked)}
                  className="border-primary data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <Label
                  htmlFor="rememberMe"
                  className="text-sm text-primary cursor-pointer"
                >
                  Remember me
                </Label>
              </div>
              <button
                type="button"
                className="text-sm text-primary hover:text-primary/80 transition-colors"
              >
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              disabled={mutation.isPending}
              className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg rounded-xl transition-all duration-300 shadow-glow hover:shadow-lg"
            >
              {mutation.isPending ? "LOGGING IN..." : "LOGIN"}
            </Button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
