import { z, ZodType } from "zod";

export class AddressValidation {
  static readonly CREATE: ZodType = z.object({
    contact_id: z.number().positive(),
    street: z.string().min(5).max(255).optional(),
    city: z.string().min(1).max(50).optional(),
    province: z.string().min(1).max(50).optional(),
    country: z
      .string({ required_error: "Country is Required!" })
      .min(1)
      .max(30),
    postal_code: z
      .string({ required_error: "Postal Code is Required!" })
      .min(8)
      .max(20),
  });

  static readonly GET: ZodType = z.object({
    id: z.number().positive(),
    contact_id: z.number().positive(),
  });

  static readonly UPDATE: ZodType = z.object({
    id: z.number().positive(),
    contact_id: z.number().positive(),
    street: z.string().min(5).max(255).optional(),
    city: z.string().min(1).max(50).optional(),
    province: z.string().min(1).max(50).optional(),
    country: z
      .string({ required_error: "Country is Required!" })
      .min(1)
      .max(30)
      .optional(),
    postal_code: z
      .string({ required_error: "Postal Code is Required!" })
      .min(8)
      .max(20)
      .optional(),
  });

  static readonly REMOVE: ZodType = z.object({
    id: z.number().positive(),
    contact_id: z.number().positive(),
  });
}
