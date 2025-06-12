import express from "express";
import { UserController } from "../controller/UserController";
import { authMiddleware } from "../middleware/authMiddleware";
import { ContactController } from "../controller/ContactController";
import { AddressController } from "../controller/AddressController";
import { UIController } from "../controller/UIController";

export const apiRouter = express.Router();
apiRouter.use(authMiddleware);
//User
apiRouter.get("/api/users/current", UserController.getCurrentUser);
apiRouter.patch("/api/users/current", UserController.updateCurrentUser);
apiRouter.delete("/api/users/current", UserController.logout);

//Contact
apiRouter.post("/api/contacts", ContactController.createContact);
apiRouter.get("/api/contacts", ContactController.searchContact);
apiRouter.get("/api/contacts/:contactId", ContactController.getContact);
apiRouter.patch("/api/contacts/:contactId", ContactController.updateContact);
apiRouter.delete("/api/contacts/:contactId", ContactController.deleteContact);

//Address
apiRouter.post(
  "/api/contacts/:contactId/addresses",
  AddressController.createAddress
);
apiRouter.get(
  "/api/contacts/:contactId/addresses/:addressId",
  AddressController.getAddress
);
apiRouter.patch(
  "/api/contacts/:contactId/addresses/:addressId",
  AddressController.updateAddress
);
apiRouter.delete(
  "/api/contacts/:contactId/addresses/:addressId",
  AddressController.deleteAddress
);
apiRouter.get(
  "/api/contacts/:contactId/addresses",
  AddressController.listAddress
);

//Content
//Home
apiRouter.get("/", UIController.index);
//Contacts
apiRouter.get("/contacts", UIController.contacts);
apiRouter.get("/contacts/add", UIController.contactsAdd);
apiRouter.get("/contacts/edit", UIController.contactsEdit);
apiRouter.get("/contacts/:contactId", UIController.contactDetail);
//Address
apiRouter.get("/contacts/:contactId/addresses/add", UIController.addressAdd);
apiRouter.get(
  "/contacts/:contactId/addresses/:addressId",
  UIController.addressEdit
);
//About
apiRouter.get("/about", UIController.about);
