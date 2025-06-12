import { NextFunction, Response } from "express";
import { RequestUser } from "../type/RequestUser";
import {
  createAddressReq,
  deleteAddressReq,
  getAddressReq,
  updateAddressReq,
} from "../model/Address";
import { AddressService } from "../service/AddressService";

export class AddressController {
  static async createAddress(
    req: RequestUser,
    res: Response,
    next: NextFunction
  ) {
    try {
      const request: createAddressReq = req.body as createAddressReq;
      request.contact_id = Number(req.params.contactId);
      const address = await AddressService.create(req.user!, request);
      res.status(200).json({
        data: address,
      });
    } catch (err) {
      next(err);
    }
  }
  static async getAddress(req: RequestUser, res: Response, next: NextFunction) {
    try {
      const request: getAddressReq = {
        id: Number(req.params.addressId) as number,
        contact_id: Number(req.params.contactId) as number,
      };

      const address = await AddressService.get(req.user!, request);
      res.status(200).json({
        data: address,
      });
    } catch (err) {
      next(err);
    }
  }

  static async updateAddress(
    req: RequestUser,
    res: Response,
    next: NextFunction
  ) {
    try {
      const request: updateAddressReq = req.body as updateAddressReq;
      request.id = Number(req.params.addressId);
      request.contact_id = Number(req.params.contactId);

      const address = await AddressService.update(req.user!, request);
      res.status(200).json({
        data: address,
      });
    } catch (err) {
      next(err);
    }
  }

  static async deleteAddress(
    req: RequestUser,
    res: Response,
    next: NextFunction
  ) {
    try {
      const request: deleteAddressReq = {
        id: Number(req.params.addressId) as number,
        contact_id: Number(req.params.contactId) as number,
      };

      const address = await AddressService.remove(req.user!, request);
      res.status(200).json({
        data: `Address ${address.country} Removed...`,
      });
    } catch (err) {
      next(err);
    }
  }

  static async listAddress(
    req: RequestUser,
    res: Response,
    next: NextFunction
  ) {
    try {
      const contactId = Number(req.params.contactId);
      const addresses = await AddressService.list(req.user!, contactId);
      res.status(200).json({
        data: addresses,
      });
    } catch (err) {
      next(err);
    }
  }
}
