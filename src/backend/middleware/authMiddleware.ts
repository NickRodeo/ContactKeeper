import { NextFunction, Response } from "express";
import { RequestUser } from "../type/RequestUser";
import { prismaClient } from "../application/database";

export const authMiddleware = async (
  req: RequestUser,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("X-API-TOKEN") || req.cookies["X-API-TOKEN"];
  if (token) {
    const currentUser = await prismaClient.user.findFirst({
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
  } else {
    res.redirect("/login");
  }
};
