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
  updatedAt: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const PersonaAttributeCountAggregateInputObjectSchema: z.ZodType<Prisma.PersonaAttributeCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.PersonaAttributeCountAggregateInputType>;
export const PersonaAttributeCountAggregateInputObjectZodSchema = makeSchema();
