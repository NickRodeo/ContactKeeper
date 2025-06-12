"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../controller/UserController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const ContactController_1 = require("../controller/ContactController");
const AddressController_1 = require("../controller/AddressController");
const UIController_1 = require("../controller/UIController");
exports.apiRouter = express_1.default.Router();
exports.apiRouter.use(authMiddleware_1.authMiddleware);
//User
exports.apiRouter.get("/api/users/current", UserController_1.UserController.getCurrentUser);
exports.apiRouter.patch("/api/users/current", UserController_1.UserController.updateCurrentUser);
exports.apiRouter.delete("/api/users/current", UserController_1.UserController.logout);
//Contact
exports.apiRouter.post("/api/contacts", ContactController_1.ContactController.createContact);
exports.apiRouter.get("/api/contacts", ContactController_1.ContactController.searchContact);
exports.apiRouter.get("/api/contacts/:contactId", ContactController_1.ContactController.getContact);
exports.apiRouter.patch("/api/contacts/:contactId", ContactController_1.ContactController.updateContact);
exports.apiRouter.delete("/api/contacts/:contactId", ContactController_1.ContactController.deleteContact);
//Address
exports.apiRouter.post("/api/contacts/:contactId/addresses", AddressController_1.AddressController.createAddress);
exports.apiRouter.get("/api/contacts/:contactId/addresses/:addressId", AddressController_1.AddressController.getAddress);
exports.apiRouter.patch("/api/contacts/:contactId/addresses/:addressId", AddressController_1.AddressController.updateAddress);
exports.apiRouter.delete("/api/contacts/:contactId/addresses/:addressId", AddressController_1.AddressController.deleteAddress);
exports.apiRouter.get("/api/contacts/:contactId/addresses", AddressController_1.AddressController.listAddress);
//Content
//Home
exports.apiRouter.get("/", UIController_1.UIController.index);
//Contacts
exports.apiRouter.get("/contacts", UIController_1.UIController.contacts);
exports.apiRouter.get("/contacts/add", UIController_1.UIController.contactsAdd);
exports.apiRouter.get("/contacts/edit", UIController_1.UIController.contactsEdit);
exports.apiRouter.get("/contacts/:contactId", UIController_1.UIController.contactDetail);
//Address
exports.apiRouter.get("/contacts/:contactId/addresses/add", UIController_1.UIController.addressAdd);
exports.apiRouter.get("/contacts/:contactId/addresses/:addressId", UIController_1.UIController.addressEdit);
//About
exports.apiRouter.get("/about", UIController_1.UIController.about);
