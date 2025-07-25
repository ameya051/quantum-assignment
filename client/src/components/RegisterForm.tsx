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
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-primary text-primary-foreground px-12 py-3 rounded-lg font-semibold text-lg tracking-wide">
            SIGN UP
          </div>
        </div>

        {/* Register Card */}
        <div className="bg-card rounded-3xl p-8 shadow-glow border border-border/20">
          {/* Avatar */}
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center border-2 border-muted">
              <User className="w-10 h-10 text-muted-foreground" />
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Field */}
            <div className="space-y-2">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  {...register("name")}
                  type="text"
                  placeholder="Full name"
                  className={`pl-12 h-14 bg-input border-border text-foreground placeholder:text-muted-foreground rounded-xl ${errors.name ? "border-destructive" : ""
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
                    <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground z-10" />
                    <Button
                      type="button"
                      variant="outline"
                      className={cn(
                        "w-full h-14 pl-12 bg-input border-border text-foreground placeholder:text-muted-foreground rounded-xl justify-start text-left font-normal",
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
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  {...register("email")}
                  type="email"
                  placeholder="Email address"
                  className={`pl-12 h-14 bg-input border-border text-foreground placeholder:text-muted-foreground rounded-xl ${errors.email ? "border-destructive" : ""
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
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  {...register("password")}
                  type="password"
                  placeholder="Password"
                  className={`pl-12 h-14 bg-input border-border text-foreground placeholder:text-muted-foreground rounded-xl ${errors.password ? "border-destructive" : ""
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
        </div>
      </div>
    </div>
  );
};
