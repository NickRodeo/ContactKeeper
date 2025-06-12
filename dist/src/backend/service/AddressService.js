"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressService = void 0;
const Address_1 = require("../model/Address");
const Validation_1 = require("../validation/Validation");
const AddressValidation_1 = require("../validation/AddressValidation");
const ContactService_1 = require("./ContactService");
const database_1 = require("../application/database");
const ResponseError_1 = require("../error/ResponseError");
class AddressService {
    static async checkAddress(contactId, addressId) {
        const address = await database_1.prismaClient.address.findFirst({
            where: {
                id: addressId,
                contact_id: contactId,
            },
        });
        if (!address)
            throw new ResponseError_1.ResponseError(404, "Address not found");
        return address;
    }
    static async create(user, req) {
        const address = Validation_1.Validation.validate(AddressValidation_1.AddressValidation.CREATE, req);
        await ContactService_1.ContactService.checkContact(user.username, address.contact_id);
        const newAddress = await database_1.prismaClient.address.create({
            data: address,
        });
        return (0, Address_1.toAddressResponse)(newAddress);
    }
    static async get(user, req) {
        const request = Validation_1.Validation.validate(AddressValidation_1.AddressValidation.GET, req);
        await ContactService_1.ContactService.checkContact(user.username, request.contact_id);
        const address = await this.checkAddress(request.contact_id, request.id);
        return (0, Address_1.toAddressResponse)(address);
    }
    static async update(user, req) {
        const request = Validation_1.Validation.validate(AddressValidation_1.AddressValidation.UPDATE, req);
        await ContactService_1.ContactService.checkContact(user.username, request.contact_id);
        await this.checkAddress(request.contact_id, request.id);
        const address = await database_1.prismaClient.address.update({
            where: {
                id: request.id,
                contact_id: request.contact_id,
            },
            data: request,
        });
        return (0, Address_1.toAddressResponse)(address);
    }
    static async remove(user, req) {
        const request = Validation_1.Validation.validate(AddressValidation_1.AddressValidation.REMOVE, req);
        await ContactService_1.ContactService.checkContact(user.username, request.contact_id);
        await this.checkAddress(request.contact_id, request.id);
        const address = await database_1.prismaClient.address.delete({
            where: {
                id: request.id,
                contact_id: request.contact_id,
            },
        });
        return (0, Address_1.toAddressResponse)(address);
    }
    static async list(user, contactId) {
        await ContactService_1.ContactService.checkContact(user.username, contactId);
        const addresses = await database_1.prismaClient.address.findMany({
            where: {
                contact_id: contactId,
            },
        });
        return addresses.map((address) => (0, Address_1.toAddressResponse)(address));
    }
}
exports.AddressService = AddressService;
