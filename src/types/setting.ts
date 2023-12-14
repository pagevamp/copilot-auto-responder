import { z } from 'zod';
import { SettingType } from '@prisma/client';

export const WorkingHoursSchema = z.array(
  z.object({
    weekday: z.number().min(1).max(7),
    startTime: z.string(),
    endTime: z.string(),
  }),
);
export type WorkingHours = z.infer<typeof WorkingHoursSchema>;

export const SettingRequestSchema = z.object({
  type: z.nativeEnum(SettingType),
  timezone: z.string().nullable(),
  workingHours: WorkingHoursSchema.nullable(),
  message: z.string().nullable(),
});
export type SettingRequest = z.infer<typeof SettingRequestSchema>;

export const SettingResponseSchema = z.object({
  id: z.string(),
  type: z.nativeEnum(SettingType),
  timezone: z.string().nullable(),
  workingHours: WorkingHoursSchema.nullable(),
  createdById: z.string().uuid(),
  message: z.string().nullable(),
});
export type SettingResponse = z.infer<typeof SettingResponseSchema>;
