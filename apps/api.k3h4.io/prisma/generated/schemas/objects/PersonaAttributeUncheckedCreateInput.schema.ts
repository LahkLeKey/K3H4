import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  userId: z.string(),
  personaId: z.string(),
  category: z.string(),
  value: z.string(),
  weight: z.number().int().optional(),
  createdAt: z.coerce.date().optional()
}).strict();
export const PersonaAttributeUncheckedCreateInputObjectSchema: z.ZodType<Prisma.PersonaAttributeUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaAttributeUncheckedCreateInput>;
export const PersonaAttributeUncheckedCreateInputObjectZodSchema = makeSchema();
