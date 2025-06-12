"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const database_1 = require("../application/database");
const ResponseError_1 = require("../error/ResponseError");
const User_1 = require("../model/User");
const UserValidation_1 = require("../validation/UserValidation");
const Validation_1 = require("../validation/Validation");
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
class UserService {
    //Register
    static async register(req) {
        const registeredUser = Validation_1.Validation.validate(UserValidation_1.UserValidation.REGISTER, req); //Validasi User Yang Register (Mengembalikan RegisterUserReq)
        const isRegisteredTwice = await database_1.prismaClient.user.count({
            where: {
                username: registeredUser.username,
            },
        });
        if (isRegisteredTwice) {
            //Cek User Sudah Terdaftar
            throw new ResponseError_1.ResponseError(400, "Username Sudah Terdaftar");
        }
        registeredUser.password = await bcrypt_1.default.hash(registeredUser.password, 10); //Enkripsi Password
        const user = await database_1.prismaClient.user.create({
            data: registeredUser,
        });
        return (0, User_1.toUserResponse)(user);
    }
    //Login
    static async login(req) {
        const loginUser = Validation_1.Validation.validate(UserValidation_1.UserValidation.LOGIN, req); //Validasi User Yang Login (Mengembalikan RegisterUserReq)
        let user = await database_1.prismaClient.user.findUnique({
            //Cek apakah user sudah terdaftar
            where: {
                username: loginUser.username,
            },
        });
        if (!user || !(await bcrypt_1.default.compare(loginUser.password, user.password)))
            //Jika User Tidak Terdaftar atau Password Salah
            throw new ResponseError_1.ResponseError(401, "Username atau Password Salah");
        // if (user.token !== null) throw new ResponseError(400, "Already Login");
        user = await database_1.prismaClient.user.update({
            where: {
                username: loginUser.username,
            },
            data: {
                token: (0, uuid_1.v4)(),
            },
        });
        return (0, User_1.toUserResponse)(user);
    }
    //Get User
    static async get(user) {
        return (0, User_1.toUserResponse)(user);
    }
    //Update User
    static async update(user, req) {
        const requestUser = Validation_1.Validation.validate(UserValidation_1.UserValidation.UPDATE, req);
        if (requestUser.name)
            user.name = requestUser.name;
        if (requestUser.password)
            user.password = await bcrypt_1.default.hash(requestUser.password, 10);
        const updatedUser = await database_1.prismaClient.user.update({
            where: {
                username: user.username,
            },
            data: user,
        });
        return (0, User_1.toUserResponse)(updatedUser);
    }
    static async logout(user) {
        const outUser = await database_1.prismaClient.user.update({
            where: {
                username: user.username,
            },
            data: {
                token: null,
            },
        });
        return (0, User_1.toUserResponse)(outUser);
    }
}
exports.UserService = UserService;
