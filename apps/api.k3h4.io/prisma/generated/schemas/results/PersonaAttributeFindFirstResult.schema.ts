import * as z from 'zod';
export const PersonaAttributeFindFirstResultSchema = z.nullable(z.object({
  id: z.string(),
  userId: z.string(),
  user: z.unknown(),
  personaId: z.string(),
  persona: z.unknown(),
  category: z.string(),
  value: z.string(),
  weight: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date()
}));