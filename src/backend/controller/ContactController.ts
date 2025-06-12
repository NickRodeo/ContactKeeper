import { NextFunction, Response } from "express";
import {
  ContactReq,
  SearchContactReq,
  UpdateContactReq,
} from "../model/Contact";
import { ContactService } from "../service/ContactService";
import { RequestUser } from "../type/RequestUser";

export class ContactController {
  static async createContact(
    req: RequestUser,
    res: Response,
    next: NextFunction
  ) {
    try {
      const request: ContactReq = req.body as ContactReq;
      const createdContact = await ContactService.create(req.user!, request);
      res.status(200).json({
        data: createdContact,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getContact(req: RequestUser, res: Response, next: NextFunction) {
    try {
      const contactId = req.params.contactId;
      if (!/^\d+$/.test(contactId)) {
        res.status(204).end();
        return;
      } // check if id is a number

      const contact = await ContactService.get(req.user!, Number(contactId));
      res.status(200).json({
        data: contact,
      });
    } catch (err) {
      next(err);
    }
  }

  static async updateContact(
    req: RequestUser,
    res: Response,
    next: NextFunction
  ) {
    try {
      const contactId = req.params.contactId;
      if (!/^\d+$/.test(contactId)) {
        res.status(204).end();
        return;
      } // check if id is a number
      const request: UpdateContactReq = req.body as UpdateContactReq;
      const contact = await ContactService.update(
        request,
        req.user!,
        Number(contactId)
      );
      res.status(200).json({
        data: contact,
      });
    } catch (err) {
      next(err);
    }
  }

  static async deleteContact(
    req: RequestUser,
    res: Response,
    next: NextFunction
  ) {
    try {
      const contactId = req.params.contactId;
      if (!/^\d+$/.test(contactId)) {
        res.status(204).end();
        return;
      } // check if id is a number
      const contact = await ContactService.remove(req.user!, Number(contactId));
      res.status(200).json({
        data: `Contact Name ${
          contact.first_name + " " + (contact.last_name ?? "")
        } Removed...`,
      });
    } catch (err) {
      next(err);
    }
  }

  static async searchContact(
    req: RequestUser,
    res: Response,
    next: NextFunction
  ) {
    try {
      const request: SearchContactReq = {
        name: req.query.name as string,
        email: req.query.email as string,
        phone: req.query.phone as string,
        page: req.query.page ? Number(req.query.page) : (1 as number),
        size: req.query.size ? Number(req.query.size) : (10 as number),
      };
      const contacts = await ContactService.search(req.user!, request);
      res.status(200).json(contacts);
    } catch (err) {
      next(err);
    }
  }
}
