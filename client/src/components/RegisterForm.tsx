import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { User, Mail, Lock, CalendarIcon, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { registerSchema, type RegisterFormData } from "@/schemas/auth";
import { useRegisterMutation } from "@/apis/auth";
import { Link } from "@tanstack/react-router";

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      dob: new Date(),
      email: "",
      password: "",
    },
  });

  const dob = watch("dob");

  const mutation = useRegisterMutation();

  const onSubmit = (data: RegisterFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gradient-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Register Card */}
        <div className="bg-card p-8 shadow-glow border border-border/20">
          <div className="text-center -mt-14 mb-6">
            <div className="inline-block bg-primary text-primary-foreground px-12 py-3 font-semibold text-lg tracking-wide">
              SIGN UP
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
            {/* Name Field */}
            <div className="space-y-2">
              <div className="relative">
                <div className="absolute left-0 top-0 h-full w-12 flex items-center justify-center border-r border-border/50">
                  <User className="w-5 h-5 text-muted-foreground" />
                </div>
                <Input
                  {...register("name")}
                  type="text"
                  placeholder="Full name"
                  className={`pl-14 h-14 bg-input border-border text-foreground placeholder:text-muted-foreground rounded-xl ${errors.name ? "border-destructive" : ""
                    }`}
                />
              </div>
              {errors.name && (
                <div className="flex items-center gap-2 text-destructive text-sm">
                  <AlertCircle className="w-4 h-4" />
                  {errors.name.message}
                </div>
              )}
            </div>

            {/* Date of Birth Field */}
            <div className="space-y-2">
              <Popover>
                <PopoverTrigger asChild>
                  <div className="relative">
                    <div className="absolute left-0 top-0 h-full w-12 flex items-center justify-center border-r border-border/50 z-10">
                      <CalendarIcon className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      className={cn(
                        "w-full h-14 pl-14 bg-input border-border text-foreground placeholder:text-muted-foreground rounded-xl justify-start text-left font-normal",
                        !dob && "text-muted-foreground",
                        errors.dob && "border-destructive"
                      )}
                    >
                      {dob ? format(dob, "PPP") : <span>Date of birth</span>}
                    </Button>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    captionLayout="dropdown"
                    selected={dob}
                    onSelect={(date) => {
                      if (date) {
                        setValue("dob", date);
                      }
                    }}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    autoFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              {errors.dob && (
                <div className="flex items-center gap-2 text-destructive text-sm">
                  <AlertCircle className="w-4 h-4" />
                  {errors.dob.message}
                </div>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <div className="relative">
                <div className="absolute left-0 top-0 h-full w-12 flex items-center justify-center border-r border-border/50">
                  <Mail className="w-5 h-5 text-muted-foreground" />
                </div>
                <Input
                  {...register("email")}
                  type="email"
                  placeholder="Email address"
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
                  placeholder="Password"
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

            {/* Terms & Conditions */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                By signing up, you agree to our{" "}
                <button
                  type="button"
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  Terms & Conditions
                </button>
              </p>
            </div>

            {/* Register Button */}
            <Button
              type="submit"
              disabled={mutation.isPending}
              className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg rounded-xl transition-all duration-300 shadow-glow hover:shadow-lg"
            >
              {mutation.isPending ? "CREATING ACCOUNT..." : "SIGN UP"}
            </Button>
          </form>

          {/* Sign In Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
