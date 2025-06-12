"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
class UserValidation {
}
exports.UserValidation = UserValidation;
UserValidation.REGISTER = zod_1.z.object({
    username: zod_1.z
        .string({ required_error: "Username is Required!" })
        .min(1)
        .max(100),
    password: zod_1.z
        .string({ required_error: "Password is Required!" })
        .min(4)
        .max(255),
    name: zod_1.z.string({ required_error: "Name is Required!" }).min(1).max(100),
});
UserValidation.LOGIN = zod_1.z.object({
    username: zod_1.z
        .string({ required_error: "Username is Required!" })
        .min(1)
        .max(100),
    password: zod_1.z
        .string({ required_error: "Password is Required!" })
        .min(4)
        .max(255),
});
UserValidation.UPDATE = zod_1.z.object({
    password: zod_1.z.string().min(1).max(255).optional(),
    name: zod_1.z.string().min(1).max(100).optional(),
});
