import { z } from 'zod';

// Register validation schema
export const registerSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters long')
    .max(50, 'Name must be less than 50 characters')
    .trim(),
  email: z
    .string()
    .email('Invalid email format')
    .toLowerCase()
    .trim(),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .max(100, 'Password must be less than 100 characters'),
  dob: z
    .string()
    .datetime({ message: 'Invalid date format' })
    .or(z.string().date('Invalid date format'))
    .transform((str) => new Date(str))
    .refine((date) => date <= new Date(), {
      message: 'Date of birth cannot be in the future'
    })
    .refine((date) => !isNaN(date.getTime()), {
      message: 'Invalid date of birth'
    })
});

// Login validation schema
export const loginSchema = z.object({
  email: z
    .string()
    .email('Invalid email format')
    .toLowerCase()
    .trim(),
  password: z
    .string()
    .min(1, 'Password is required')
});

// Type inference
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
