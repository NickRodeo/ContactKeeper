"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toContactResponse = toContactResponse;
function toContactResponse(contact) {
    return {
        id: contact.id,
        first_name: contact.first_name,
        last_name: contact.last_name ?? undefined,
        email: contact.email ?? undefined,
        phone: contact.phone ?? undefined,
    };
}
