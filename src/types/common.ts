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

export const CompanyResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  iconImageUrl: z.string(),
});
export type CompanyResponse = z.infer<typeof CompanyResponseSchema>;
