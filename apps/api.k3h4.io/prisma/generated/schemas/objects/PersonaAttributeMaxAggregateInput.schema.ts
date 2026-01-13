import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  personaId: z.literal(true).optional(),
  category: z.literal(true).optional(),
  value: z.literal(true).optional(),
  weight: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const PersonaAttributeMaxAggregateInputObjectSchema: z.ZodType<Prisma.PersonaAttributeMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.PersonaAttributeMaxAggregateInputType>;
export const PersonaAttributeMaxAggregateInputObjectZodSchema = makeSchema();
