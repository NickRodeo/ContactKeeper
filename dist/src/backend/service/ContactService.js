"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactService = void 0;
const database_1 = require("../application/database");
const Contact_1 = require("../model/Contact");
const ContactValidation_1 = require("../validation/ContactValidation");
const Validation_1 = require("../validation/Validation");
const ResponseError_1 = require("../error/ResponseError");
class ContactService {
    static async checkContact(username, contactId) {
        const contact = await database_1.prismaClient.contact.findFirst({
            where: {
                id: contactId,
                username: username,
            },
        });
        if (!contact)
            throw new ResponseError_1.ResponseError(404, "Contact not found");
        return contact;
    }
    static async create(user, req) {
        const validatedContact = await Validation_1.Validation.validate(ContactValidation_1.ContactValidation.CREATE, req);
        const newContact = {
            ...validatedContact,
            username: user.username,
        };
        const createdContact = await database_1.prismaClient.contact.create({
            data: newContact,
        });
        return (0, Contact_1.toContactResponse)(createdContact);
    }
    static async get(user, contactId) {
        const contact = await this.checkContact(user.username, contactId);
        return (0, Contact_1.toContactResponse)(contact);
    }
    static async update(req, user, contactId) {
        req.id = contactId;
        const validatedContact = await Validation_1.Validation.validate(ContactValidation_1.ContactValidation.UPDATE, req);
        const oldContact = await this.checkContact(user.username, contactId);
        const updatedContact = await database_1.prismaClient.contact.update({
            where: {
                id: contactId,
                username: user.username,
            },
            data: {
                id: validatedContact.id,
                first_name: validatedContact.first_name ?? oldContact.first_name,
                last_name: validatedContact.last_name ?? "",
                email: validatedContact.email ?? "",
                phone: validatedContact.phone ?? oldContact.phone,
                username: user.username,
            },
        });
        return (0, Contact_1.toContactResponse)(updatedContact);
    }
    static async remove(user, contactId) {
        await this.checkContact(user.username, contactId);
        const contact = await database_1.prismaClient.contact.delete({
            where: {
                id: contactId,
                username: user.username,
            },
        });
        return (0, Contact_1.toContactResponse)(contact);
    }
    static async search(user, req) {
        const request = await Validation_1.Validation.validate(ContactValidation_1.ContactValidation.SEARCH, req);
        const skip = request.size * (request.page - 1);
        const filters = []; //Store filters in an array
        if (request.name) {
            filters.push({
                OR: [
                    {
                        first_name: {
                            contains: request.name,
                        },
                    },
                    {
                        last_name: {
                            contains: request.name,
                        },
                    },
                ],
            });
        }
        if (request.email) {
            filters.push({
                email: {
                    contains: request.email,
                },
            });
        }
        if (request.phone) {
            filters.push({
                phone: {
                    contains: request.phone,
                },
            });
        }
        const contacts = await database_1.prismaClient.contact.findMany({
            where: {
                username: user.username,
                AND: filters,
            },
            skip: skip,
            take: request.size,
        });
        const contactsCount = await database_1.prismaClient.contact.count({
            where: {
                username: user.username,
                AND: filters,
            },
        });
        const total_page = Math.ceil(contactsCount / request.size);
        return {
            data: contacts.map((contact) => (0, Contact_1.toContactResponse)(contact)),
            paging: {
                current_page: request.page,
                total_page: total_page,
                size: request.size,
            },
        };
    }
}
exports.ContactService = ContactService;
