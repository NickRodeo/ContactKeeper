import { User } from "../generated/prisma"; // Dari Schema

export type RegisterUserReq = {
  username: string;
  password: string;
  name: string;
};

export type LoginUserReq = {
  username: string;
  password: string;
};

export type UpdateUserReq = {
  password: string;
  name: string;
};

export type UserRes = {
  username: string;
  name: string;
  token?: string;
};

export function toUserResponse(user: User): UserRes {
  return {
    username: user.username,
    name: user.name,
    token: user.token ?? undefined,
  };
}
