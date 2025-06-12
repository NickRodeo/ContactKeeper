import { Address, User } from "@prisma/client";
import {
  addressRes,
  createAddressReq,
  deleteAddressReq,
  getAddressReq,
  toAddressResponse,
  updateAddressReq,
} from "../model/Address";
import { Validation } from "../validation/Validation";
import { AddressValidation } from "../validation/AddressValidation";
import { ContactService } from "./ContactService";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/ResponseError";

export class AddressService {
  static async checkAddress(
    contactId: number,
    addressId: number
  ): Promise<Address> {
    const address = await prismaClient.address.findFirst({
      where: {
        id: addressId,
        contact_id: contactId,
      },
    });
    if (!address) throw new ResponseError(404, "Address not found");
    return address;
  }
  static async create(user: User, req: createAddressReq): Promise<addressRes> {
    const address = Validation.validate(AddressValidation.CREATE, req);
    await ContactService.checkContact(user.username, address.contact_id);
    const newAddress = await prismaClient.address.create({
      data: address,
    });
    return toAddressResponse(newAddress);
  }

  static async get(user: User, req: getAddressReq): Promise<addressRes> {
    const request = Validation.validate(AddressValidation.GET, req);
    await ContactService.checkContact(user.username, request.contact_id);
    const address = await this.checkAddress(request.contact_id, request.id);
    return toAddressResponse(address);
  }

  static async update(user: User, req: updateAddressReq): Promise<addressRes> {
    const request = Validation.validate(AddressValidation.UPDATE, req);
    await ContactService.checkContact(user.username, request.contact_id);
    await this.checkAddress(request.contact_id, request.id);
    const address = await prismaClient.address.update({
      where: {
        id: request.id,
        contact_id: request.contact_id,
      },
      data: request,
    });
    return toAddressResponse(address);
  }

  static async remove(user: User, req: deleteAddressReq): Promise<addressRes> {
    const request = Validation.validate(AddressValidation.REMOVE, req);
    await ContactService.checkContact(user.username, request.contact_id);
    await this.checkAddress(request.contact_id, request.id);
    const address = await prismaClient.address.delete({
      where: {
        id: request.id,
        contact_id: request.contact_id,
      },
    });
    return toAddressResponse(address);
  }

  static async list(user: User, contactId: number): Promise<Array<addressRes>> {
    await ContactService.checkContact(user.username, contactId);
    const addresses = await prismaClient.address.findMany({
      where: {
        contact_id: contactId,
      },
    });
    return addresses.map((address) => toAddressResponse(address));
  }
}
