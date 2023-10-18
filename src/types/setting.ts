import { z } from 'zod';
import { SettingType } from '@prisma/client';

export const WorkingHoursSchema = z.array(z.object({
  weekday: z.number().min(1).max(7),
  startTime: z.string(),
  endTime: z.string(),
}));

export const SettingRequestSchema = z.object({
  type: z.nativeEnum(SettingType),
  timezone: z.string().optional(),
  workingHours: WorkingHoursSchema.optional(),
  message: z.string().optional()
});
export type SettingRequest = z.infer<typeof SettingRequestSchema>;

export const SettingResponseSchema = z.object({
  id: z.string(),
  type: z.nativeEnum(SettingType),
  timezone: z.string().nullable(),
  workingHours: WorkingHoursSchema.nullable(),
  createdById: z.string().uuid(),
  message: z.string().optional()
});
export type SettingResponse = z.infer<typeof SettingResponseSchema>;
