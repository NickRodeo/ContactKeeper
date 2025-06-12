"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const UserService_1 = require("../service/UserService");
class UserController {
    static async register(req, res, next) {
        try {
            const request = req.body;
            const data = await UserService_1.UserService.register(request);
            if (req.headers.accept?.includes("application/json")) {
                res.status(200).json({ data });
            }
            else {
                res.redirect("/login");
            }
        }
        catch (err) {
            next(err);
        }
    }
    static async login(req, res, next) {
        try {
            const request = req.body;
            const data = await UserService_1.UserService.login(request);
            res.cookie("X-API-TOKEN", data.token, {
                httpOnly: true, // Aman dari XSS
                secure: process.env.NODE_ENV === "production", // Pakai HTTPS
                sameSite: "strict", // Aman dari CSRF
                maxAge: 24 * 60 * 60 * 1000, // 1 hari
            });
            if (req.headers.accept?.includes("application/json")) {
                res.status(200).json({ data });
            }
            else {
                res.redirect("/");
            }
        }
        catch (err) {
            next(err);
        }
    }
    static async getCurrentUser(req, res, next) {
        try {
            const data = await UserService_1.UserService.get(req.user);
            res.status(200).json({
                data: data,
            });
        }
        catch (err) {
            next(err);
        }
    }
    static async updateCurrentUser(req, res, next) {
        try {
            const request = req.body;
            const data = await UserService_1.UserService.update(req.user, request);
            res.status(200).json({
                data: data,
            });
        }
        catch (err) {
            next(err);
        }
    }
    static async logout(req, res, next) {
        console.log(req.cookies["X-API-TOKEN"]);
        try {
            res.clearCookie("X-API-TOKEN", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
            });
            const data = await UserService_1.UserService.logout(req.user);
            console.log("Berhasil logout : ", data);
            res.status(200).json({ data });
        }
        catch (err) {
            next(err);
        }
    }
}
exports.UserController = UserController;
