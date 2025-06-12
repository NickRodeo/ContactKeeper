import { z, ZodType } from "zod";

export class UserValidation {
  static readonly REGISTER: ZodType = z.object({
    username: z
      .string({ required_error: "Username is Required!" })
      .min(1)
      .max(100),
    password: z
      .string({ required_error: "Password is Required!" })
      .min(4)
      .max(255),
    name: z.string({ required_error: "Name is Required!" }).min(1).max(100),
  });

  static readonly LOGIN: ZodType = z.object({
    username: z
      .string({ required_error: "Username is Required!" })
      .min(1)
      .max(100),
    password: z
      .string({ required_error: "Password is Required!" })
      .min(4)
      .max(255),
  });

  static readonly UPDATE: ZodType = z.object({
    password: z.string().min(1).max(255).optional(),
    name: z.string().min(1).max(100).optional(),
  });
}
