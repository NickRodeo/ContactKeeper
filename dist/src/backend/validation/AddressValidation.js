"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressValidation = void 0;
const zod_1 = require("zod");
class AddressValidation {
}
exports.AddressValidation = AddressValidation;
AddressValidation.CREATE = zod_1.z.object({
    contact_id: zod_1.z.number().positive(),
    street: zod_1.z.string().min(5).max(255).optional(),
    city: zod_1.z.string().min(1).max(50).optional(),
    province: zod_1.z.string().min(1).max(50).optional(),
    country: zod_1.z
        .string({ required_error: "Country is Required!" })
        .min(1)
        .max(30),
    postal_code: zod_1.z
        .string({ required_error: "Postal Code is Required!" })
        .min(8)
        .max(20),
});
AddressValidation.GET = zod_1.z.object({
    id: zod_1.z.number().positive(),
    contact_id: zod_1.z.number().positive(),
});
AddressValidation.UPDATE = zod_1.z.object({
    id: zod_1.z.number().positive(),
    contact_id: zod_1.z.number().positive(),
    street: zod_1.z.string().min(5).max(255).optional(),
    city: zod_1.z.string().min(1).max(50).optional(),
    province: zod_1.z.string().min(1).max(50).optional(),
    country: zod_1.z
        .string({ required_error: "Country is Required!" })
        .min(1)
        .max(30)
        .optional(),
    postal_code: zod_1.z
        .string({ required_error: "Postal Code is Required!" })
        .min(8)
        .max(20)
        .optional(),
});
AddressValidation.REMOVE = zod_1.z.object({
    id: zod_1.z.number().positive(),
    contact_id: zod_1.z.number().positive(),
});
