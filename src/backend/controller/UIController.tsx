import { NextFunction, Request, Response } from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";
import Home from "../../frontend/home/index";
import Contacts from "../../frontend/contacts";
import AddContact from "../../frontend/contacts/add";
import EditContact from "../../frontend/contacts/edit";
import { ContactController } from "./ContactController";
import { prismaClient } from "../application/database";
import { RequestUser } from "../type/RequestUser";
import DetailContact from "../../frontend/contacts/detail";
import AddAddress from "../../frontend/address/add";
import EditAddress from "../../frontend/address/edit";

export class UIController {
  static toHTML(html: string, data: string, title: string): string {
    return `
  <!DOCTYPE html>
  <html>
    <head>
      <title>${title}</title>
      <link rel="stylesheet" href="/tailwind/output.css" />
    </head>
    <body>
      <div id="root" data-page="${data}">${html}</div>
      <script src="/bundle.js"></script>
    </body>
  </html>
`;
  }

  static index(req: Request, res: Response, next: NextFunction): void {
    const html = ReactDOMServer.renderToString(<Home />);
    res.send(UIController.toHTML(html, "home", "Home"));
  }

  static contacts(req: Request, res: Response, next: NextFunction): void {
    const html = ReactDOMServer.renderToString(<Contacts />);
    res.send(UIController.toHTML(html, "contacts", "Contacts"));
  }

  static contactsAdd(req: Request, res: Response, next: NextFunction): void {
    const html = ReactDOMServer.renderToString(<AddContact />);
    res.send(UIController.toHTML(html, "addContact", "Add Contact"));
  }

  static async contactsEdit(
    req: RequestUser,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const contactIdStr = req.query.contactId as string | undefined;
    if (!contactIdStr || !/^\d+$/.test(contactIdStr)) {
      res.status(404).end();
    }
    const contactId = parseInt(contactIdStr!, 10);
    const contact = await prismaClient.contact.findFirst({
      where: {
        id: contactId,
        username: req.user!.username,
      },
    });
    console.log(contact);
    if (!contact) {
      res.status(404).end();
    }

    const html = ReactDOMServer.renderToString(<EditContact />);
    res.send(UIController.toHTML(html, "editContact", "Edit Contact"));
  }

  static contactDetail(req: Request, res: Response, next: NextFunction): void {
    const html = ReactDOMServer.renderToString(<DetailContact />);
    res.send(UIController.toHTML(html, "detailContact", "Detail Contact"));
  }

  static addressAdd(req: Request, res: Response, next: NextFunction): void {
    const html = ReactDOMServer.renderToString(<AddAddress />);
    res.send(UIController.toHTML(html, "addAddress", "Add Address"));
  }

  static addressEdit(req: Request, res: Response, next: NextFunction): void {
    const html = ReactDOMServer.renderToString(<EditAddress />);
    res.send(UIController.toHTML(html, "editAddress", "Edit Address"));
  }

  static about(req: Request, res: Response, next: NextFunction): void {
    const html = ReactDOMServer.renderToString(<Contacts />);
    res.send(UIController.toHTML(html, "about", "About"));
  }
}
