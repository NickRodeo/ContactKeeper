"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toUserResponse = toUserResponse;
function toUserResponse(user) {
    return {
        username: user.username,
        name: user.name,
        token: user.token ?? undefined,
    };
}
