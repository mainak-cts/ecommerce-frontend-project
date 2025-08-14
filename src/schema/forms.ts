import { z } from "zod";

export const LoginFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export const SignUpFormSchema = z
  .object({
    name: z.string().min(3, { message: "Name must be at least 3 characters" }),
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters" }),
    email: z.email(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Please confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    // Custom check to validate password and confirmPassword are same
    path: ["confirmPassword"], // Where to attach the error, if any
    message: "Password don't match",
  });
