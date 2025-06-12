"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicRouter = void 0;
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../controller/UserController");
const AuthController_1 = require("../controller/AuthController");
exports.publicRouter = express_1.default.Router();
exports.publicRouter.post("/api/users", UserController_1.UserController.register);
exports.publicRouter.post("/api/users/login", UserController_1.UserController.login);
exports.publicRouter.get("/register", AuthController_1.AuthController.register);
exports.publicRouter.get("/login", AuthController_1.AuthController.login);
