import express from "express";
import { UserController } from "../controller/UserController";
import { AuthController } from "../controller/AuthController";

export const publicRouter = express.Router();
publicRouter.post("/api/users", UserController.register);
publicRouter.post("/api/users/login", UserController.login);

publicRouter.get("/register", AuthController.register);
publicRouter.get("/login", AuthController.login);
