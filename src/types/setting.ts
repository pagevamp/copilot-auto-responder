import { z } from 'zod';
import { SettingType } from '@prisma/client';

export const WorkingHoursSchema = z.object({
  timezone: z.string(),
  data: z.array(z.object({
    weekday: z.number().min(1).max(7),
    startTime: z.string(),
    endTime: z.string(),
  }))
});

export const SettingRequestSchema = z.object({
  type: z.nativeEnum(SettingType),
  workingHours: WorkingHoursSchema.optional(),
  message: z.string().optional()
});

export const SettingResponseSchema = z.object({
  id: z.string(),
  type: z.nativeEnum(SettingType),
  workingHours: WorkingHoursSchema.optional(),
  senderId: z.string().uuid(),
  message: z.string().optional()
});
