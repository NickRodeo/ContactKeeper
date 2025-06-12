import express from "express";
import { publicRouter } from "../router/public-api";
import { errorMiddleware } from "../middleware/errorMiddleware";
import { apiRouter } from "../router/api";
import path from "path";
import cookieParser from "cookie-parser";

export const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  "/tailwind",
  express.static(path.join(__dirname, "../../frontend/tailwind"))
);
app.use(express.static("dist/src/frontend"));
app.use(publicRouter);
app.use(apiRouter);
app.use(errorMiddleware);
