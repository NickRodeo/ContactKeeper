import { NextFunction, Request, Response } from "express";
import { UserService } from "../service/UserService";
import { RequestUser } from "../type/RequestUser";
import { LoginUserReq, RegisterUserReq, UpdateUserReq } from "../model/User";

export class UserController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const request: RegisterUserReq = req.body as RegisterUserReq;
      const data = await UserService.register(request);
      if (req.headers.accept?.includes("application/json")) {
        res.status(200).json({ data });
      } else {
        res.redirect("/login");
      }
    } catch (err) {
      next(err);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const request: LoginUserReq = req.body as LoginUserReq;
      const data = await UserService.login(request);
      res.cookie("X-API-TOKEN", data.token, {
        httpOnly: true, // Aman dari XSS
        secure: process.env.NODE_ENV === "production", // Pakai HTTPS
        sameSite: "strict", // Aman dari CSRF
        maxAge: 24 * 60 * 60 * 1000, // 1 hari
      });
      if (req.headers.accept?.includes("application/json")) {
        res.status(200).json({ data });
      } else {
        res.redirect("/");
      }
    } catch (err) {
      next(err);
    }
  }

  static async getCurrentUser(
    req: RequestUser,
    res: Response,
    next: NextFunction
  ) {
    try {
      const data = await UserService.get(req.user!);
      res.status(200).json({
        data: data,
      });
    } catch (err) {
      next(err);
    }
  }

  static async updateCurrentUser(
    req: RequestUser,
    res: Response,
    next: NextFunction
  ) {
    try {
      const request: UpdateUserReq = req.body as UpdateUserReq;
      const data = await UserService.update(req.user!, request);
      res.status(200).json({
        data: data,
      });
    } catch (err) {
      next(err);
    }
  }

  static async logout(req: RequestUser, res: Response, next: NextFunction) {
    console.log(req.cookies["X-API-TOKEN"]);
    try {
      res.clearCookie("X-API-TOKEN", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      const data = await UserService.logout(req.user!);
      console.log("Berhasil logout : ", data);
      res.status(200).json({ data });
    } catch (err) {
      next(err);
    }
  }
}
