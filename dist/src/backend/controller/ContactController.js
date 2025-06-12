"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactController = void 0;
const ContactService_1 = require("../service/ContactService");
class ContactController {
    static async createContact(req, res, next) {
        try {
            const request = req.body;
            const createdContact = await ContactService_1.ContactService.create(req.user, request);
            res.status(200).json({
                data: createdContact,
            });
        }
        catch (err) {
            next(err);
        }
    }
    static async getContact(req, res, next) {
        try {
            const contactId = req.params.contactId;
            if (!/^\d+$/.test(contactId)) {
                res.status(204).end();
                return;
            } // check if id is a number
            const contact = await ContactService_1.ContactService.get(req.user, Number(contactId));
            res.status(200).json({
                data: contact,
            });
        }
        catch (err) {
            next(err);
        }
    }
    static async updateContact(req, res, next) {
        try {
            const contactId = req.params.contactId;
            if (!/^\d+$/.test(contactId)) {
                res.status(204).end();
                return;
            } // check if id is a number
            const request = req.body;
            const contact = await ContactService_1.ContactService.update(request, req.user, Number(contactId));
            res.status(200).json({
                data: contact,
            });
        }
        catch (err) {
            next(err);
        }
    }
    static async deleteContact(req, res, next) {
        try {
            const contactId = req.params.contactId;
            if (!/^\d+$/.test(contactId)) {
                res.status(204).end();
                return;
            } // check if id is a number
            const contact = await ContactService_1.ContactService.remove(req.user, Number(contactId));
            res.status(200).json({
                data: `Contact Name ${contact.first_name + " " + (contact.last_name ?? "")} Removed...`,
            });
        }
        catch (err) {
            next(err);
        }
    }
    static async searchContact(req, res, next) {
        try {
            const request = {
                name: req.query.name,
                email: req.query.email,
                phone: req.query.phone,
                page: req.query.page ? Number(req.query.page) : 1,
                size: req.query.size ? Number(req.query.size) : 10,
            };
            const contacts = await ContactService_1.ContactService.search(req.user, request);
            res.status(200).json(contacts);
        }
        catch (err) {
            next(err);
        }
    }
}
exports.ContactController = ContactController;
