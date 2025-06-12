import { Contact, User } from "@prisma/client";
import { prismaClient } from "../application/database";
import {
  ContactReq,
  ContactRes,
  SearchContactReq,
  toContactResponse,
  UpdateContactReq,
} from "../model/Contact";
import { ContactValidation } from "../validation/ContactValidation";
import { Validation } from "../validation/Validation";
import { ResponseError } from "../error/ResponseError";
import { pageData } from "../model/Page";

export class ContactService {
  static async checkContact(
    username: string,
    contactId: number
  ): Promise<Contact> {
    const contact = await prismaClient.contact.findFirst({
      where: {
        id: contactId,
        username: username,
      },
    });

    if (!contact) throw new ResponseError(404, "Contact not found");
    return contact;
  }

  static async create(user: User, req: ContactReq): Promise<ContactRes> {
    const validatedContact = await Validation.validate(
      ContactValidation.CREATE,
      req
    );

    const newContact = {
      ...validatedContact,
      username: user.username,
    };
    const createdContact = await prismaClient.contact.create({
      data: newContact,
    });
    return toContactResponse(createdContact);
  }

  static async get(user: User, contactId: number): Promise<ContactRes> {
    const contact = await this.checkContact(user.username, contactId);
    return toContactResponse(contact);
  }

  static async update(
    req: UpdateContactReq,
    user: User,
    contactId: number
  ): Promise<ContactRes> {
    req.id = contactId;
    const validatedContact = await Validation.validate(
      ContactValidation.UPDATE,
      req
    );
    const oldContact = await this.checkContact(user.username, contactId);

    const updatedContact = await prismaClient.contact.update({
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

    return toContactResponse(updatedContact);
  }

  static async remove(user: User, contactId: number): Promise<ContactRes> {
    await this.checkContact(user.username, contactId);
    const contact = await prismaClient.contact.delete({
      where: {
        id: contactId,
        username: user.username,
      },
    });

    return toContactResponse(contact);
  }

  static async search(
    user: User,
    req: SearchContactReq
  ): Promise<pageData<ContactRes>> {
    const request = await Validation.validate(ContactValidation.SEARCH, req);

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
    const contacts = await prismaClient.contact.findMany({
      where: {
        username: user.username,
        AND: filters,
      },
      skip: skip,
      take: request.size,
    });

    const contactsCount = await prismaClient.contact.count({
      where: {
        username: user.username,
        AND: filters,
      },
    });

    const total_page = Math.ceil(contactsCount / request.size);
    return {
      data: contacts.map((contact) => toContactResponse(contact)),
      paging: {
        current_page: request.page,
        total_page: total_page,
        size: request.size,
      },
    };
  }
}
