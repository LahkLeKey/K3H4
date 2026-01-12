import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  userId: z.string(),
  personaId: z.string(),
  category: z.string(),
  value: z.string(),
  weight: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const PersonaAttributeCreateManyInputObjectSchema: z.ZodType<Prisma.PersonaAttributeCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaAttributeCreateManyInput>;
export const PersonaAttributeCreateManyInputObjectZodSchema = makeSchema();
