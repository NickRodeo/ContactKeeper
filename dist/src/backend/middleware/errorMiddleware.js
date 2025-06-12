"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const zod_1 = require("zod");
const ResponseError_1 = require("../error/ResponseError");
const errorMiddleware = async (error, req, res, next) => {
    if (error instanceof zod_1.ZodError) {
        const messages = error.errors.map((err) => err.message);
        res.status(400).json({
            errors: messages,
        });
    }
    else if (error instanceof ResponseError_1.ResponseError) {
        res.status(error.status).json({
            errors: error.message,
        });
    }
    else {
        res.status(500).json({
            errors: error.message,
        });
    }
};
exports.errorMiddleware = errorMiddleware;
