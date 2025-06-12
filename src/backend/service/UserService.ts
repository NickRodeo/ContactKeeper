import { User } from "@prisma/client";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/ResponseError";
import {
  toUserResponse,
  RegisterUserReq,
  UserRes,
  LoginUserReq,
  UpdateUserReq,
} from "../model/User";
import { UserValidation } from "../validation/UserValidation";
import { Validation } from "../validation/Validation";
import bcrypt, { compare } from "bcrypt";
import { v4 as uuid } from "uuid";

export class UserService {
  //Register
  static async register(req: RegisterUserReq): Promise<UserRes> {
    const registeredUser = Validation.validate(UserValidation.REGISTER, req); //Validasi User Yang Register (Mengembalikan RegisterUserReq)
    const isRegisteredTwice = await prismaClient.user.count({
      where: {
        username: registeredUser.username,
      },
    });
    if (isRegisteredTwice) {
      //Cek User Sudah Terdaftar
      throw new ResponseError(400, "Username Sudah Terdaftar");
    }

    registeredUser.password = await bcrypt.hash(registeredUser.password, 10); //Enkripsi Password

    const user = await prismaClient.user.create({
      data: registeredUser,
    });
    return toUserResponse(user);
  }

  //Login
  static async login(req: LoginUserReq): Promise<UserRes> {
    const loginUser = Validation.validate(UserValidation.LOGIN, req); //Validasi User Yang Login (Mengembalikan RegisterUserReq)
    let user = await prismaClient.user.findUnique({
      //Cek apakah user sudah terdaftar
      where: {
        username: loginUser.username,
      },
    });

    if (!user || !(await bcrypt.compare(loginUser.password, user.password)))
      //Jika User Tidak Terdaftar atau Password Salah
      throw new ResponseError(401, "Username atau Password Salah");

    // if (user.token !== null) throw new ResponseError(400, "Already Login");
    user = await prismaClient.user.update({
      where: {
        username: loginUser.username,
      },
      data: {
        token: uuid(),
      },
    });
    return toUserResponse(user);
  }

  //Get User
  static async get(user: User): Promise<UserRes> {
    return toUserResponse(user);
  }

  //Update User
  static async update(user: User, req: UpdateUserReq): Promise<UserRes> {
    const requestUser = Validation.validate(UserValidation.UPDATE, req);
    if (requestUser.name) user.name = requestUser.name;
    if (requestUser.password)
      user.password = await bcrypt.hash(requestUser.password, 10);

    const updatedUser = await prismaClient.user.update({
      where: {
        username: user.username,
      },
      data: user,
    });
    return toUserResponse(updatedUser);
  }

  static async logout(user: User): Promise<UserRes> {
    const outUser = await prismaClient.user.update({
      where: {
        username: user.username,
      },
      data: {
        token: null,
      },
    });
    return toUserResponse(outUser);
  }
}
