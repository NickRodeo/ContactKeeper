"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toAddressResponse = toAddressResponse;
function toAddressResponse(address) {
    return {
        id: address.id,
        street: address.street ?? undefined,
        city: address.city ?? undefined,
        province: address.province ?? undefined,
        country: address.country,
        postal_code: address.postal_code,
    };
}
