import { z } from 'zod';

export const MeResponseSchema = z.object({
  id: z.string(),
  givenName: z.string(),
  familyName: z.string(),
  email: z.string(),
  portalName: z.string(),
});
export type MeResponse = z.infer<typeof MeResponseSchema>;

export const ClientResponseSchema = z.object({
  id: z.string(),
  givenName: z.string(),
  familyName: z.string(),
  email: z.string(),
  companyId: z.string(),
  customFields: z.record(z.string(), z.union([z.string(), z.array(z.string())])).nullable(),
});

export type ClientResponse = z.infer<typeof ClientResponseSchema>;

export const ClientsResponseSchema = z.object({
  data: z.array(ClientResponseSchema).nullable(),
});

export const InternalUserSchema = z.object({
  id: z.string(),
  object: z.string(),
  createdAt: z.string(),
  givenName: z.string(),
  familyName: z.string(),
  email: z.string(),
  role: z.string(),
  isClientAccessLimited: z.boolean(),
  companyAccessList: z.array(z.string()).nullable(),
});

export const InternalUsersResponseSchema = z.object({
  data: z.array(InternalUserSchema).nullable(),
});

export const CompanyResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  iconImageUrl: z.string(),
});
export type CompanyResponse = z.infer<typeof CompanyResponseSchema>;
