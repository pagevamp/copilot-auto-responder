import { z } from 'zod';

export const WebhookSchema = z.object({
  eventType: z.string(),
  created: z.string(),
  object: z.string(),
  data: z.unknown(),
});
