"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressController = void 0;
const AddressService_1 = require("../service/AddressService");
class AddressController {
    static async createAddress(req, res, next) {
        try {
            const request = req.body;
            request.contact_id = Number(req.params.contactId);
            const address = await AddressService_1.AddressService.create(req.user, request);
            res.status(200).json({
                data: address,
            });
        }
        catch (err) {
            next(err);
        }
    }
    static async getAddress(req, res, next) {
        try {
            const request = {
                id: Number(req.params.addressId),
                contact_id: Number(req.params.contactId),
            };
            const address = await AddressService_1.AddressService.get(req.user, request);
            res.status(200).json({
                data: address,
            });
        }
        catch (err) {
            next(err);
        }
    }
    static async updateAddress(req, res, next) {
        try {
            const request = req.body;
            request.id = Number(req.params.addressId);
            request.contact_id = Number(req.params.contactId);
            const address = await AddressService_1.AddressService.update(req.user, request);
            res.status(200).json({
                data: address,
            });
        }
        catch (err) {
            next(err);
        }
    }
    static async deleteAddress(req, res, next) {
        try {
            const request = {
                id: Number(req.params.addressId),
                contact_id: Number(req.params.contactId),
            };
            const address = await AddressService_1.AddressService.remove(req.user, request);
            res.status(200).json({
                data: `Address ${address.country} Removed...`,
            });
        }
        catch (err) {
            next(err);
        }
    }
    static async listAddress(req, res, next) {
        try {
            const contactId = Number(req.params.contactId);
            const addresses = await AddressService_1.AddressService.list(req.user, contactId);
            res.status(200).json({
                data: addresses,
            });
        }
        catch (err) {
            next(err);
        }
    }
}
exports.AddressController = AddressController;
