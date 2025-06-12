"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const database_1 = require("../application/database");
const authMiddleware = async (req, res, next) => {
    const token = req.header("X-API-TOKEN") || req.cookies["X-API-TOKEN"];
    if (token) {
        const currentUser = await database_1.prismaClient.user.findFirst({
            where: {
                token: token,
            },
        });
        if (currentUser) {
            req.user = currentUser;
            next();
            return;
        }
    }
    if (req.headers.accept?.includes("application/json")) {
        res
            .status(401)
            .json({
            data: "Unauthorized",
        })
            .end();
    }
    else {
        res.redirect("/login");
    }
};
exports.authMiddleware = authMiddleware;
