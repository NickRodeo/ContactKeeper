import { z, ZodType } from "zod";

export class ContactValidation {
  static readonly CREATE: ZodType = z.object({
    first_name: z
      .string({ required_error: "First Name is Required!" })
      .min(1)
      .max(100),
    last_name: z.string().min(1).max(100).optional(),
    email: z.string().email({ message: "Email is not valid" }).optional(),
    phone: z.string().min(1).max(10).optional(),
  });

  static readonly UPDATE: ZodType = z.object({
    id: z.number().positive(),
    first_name: z.string().min(1).max(100).optional(),
    last_name: z.string().min(1).max(100).optional(),
    email: z.string().email().optional(),
    phone: z.string().min(1).max(10).optional(),
  });

  static readonly SEARCH: ZodType = z.object({
    name: z.string().min(1).max(100).optional(),
    email: z.string().optional(),
    phone: z.string().min(1).max(10).optional(),
    page: z.number().positive(),
    size: z.number().positive(),
  });
}
