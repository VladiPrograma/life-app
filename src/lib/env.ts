import { z } from 'zod';

// Extend this schema when a feature introduces public configuration.
export const environmentSchema = z.object({
  BASE_URL: z.string().min(1),
  MODE: z.string().min(1),
});

export const env = environmentSchema.parse({
  BASE_URL: import.meta.env.BASE_URL,
  MODE: import.meta.env.MODE,
});
