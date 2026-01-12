import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  personaId: z.string(),
  category: z.string(),
  value: z.string(),
  weight: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const PersonaAttributeUncheckedCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.PersonaAttributeUncheckedCreateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaAttributeUncheckedCreateWithoutUserInput>;
export const PersonaAttributeUncheckedCreateWithoutUserInputObjectZodSchema = makeSchema();
