import { Contact } from "@prisma/client";

export type ContactReq = {
  first_name: string;
  last_name?: string;
  email?: string;
  phone?: string;
};

export type UpdateContactReq = {
  id: number;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
};

export type SearchContactReq = {
  name?: string;
  email?: string;
  phone?: string;
  page: number;
  size: number; //Size in one page
};

export type ContactRes = {
  id: number;
  first_name: string;
  last_name?: string;
  email?: string;
  phone?: string;
};

export function toContactResponse(contact: Contact): ContactRes {
  return {
    id: contact.id,
    first_name: contact.first_name,
    last_name: contact.last_name ?? undefined,
    email: contact.email ?? undefined,
    phone: contact.phone ?? undefined,
  };
}
