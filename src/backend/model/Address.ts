import { Address } from "@prisma/client";

export type createAddressReq = {
  contact_id: number;
  street?: string;
  city?: string;
  province?: string;
  country: string;
  postal_code: string;
};

export type updateAddressReq = {
  id: number;
  contact_id: number;
  street?: string;
  city?: string;
  province?: string;
  country?: string;
  postal_code?: string;
};

export type getAddressReq = {
  id: number;
  contact_id: number;
};

export type deleteAddressReq = {
  id: number;
  contact_id: number;
};

export type addressRes = {
  id: number;
  street?: string;
  city?: string;
  province?: string;
  country: string;
  postal_code: string;
};

export function toAddressResponse(address: Address): addressRes {
  return {
    id: address.id,
    street: address.street ?? undefined,
    city: address.city ?? undefined,
    province: address.province ?? undefined,
    country: address.country,
    postal_code: address.postal_code,
  };
}
