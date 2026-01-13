import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  alias: z.literal(true).optional(),
  account: z.literal(true).optional(),
  handle: z.literal(true).optional(),
  note: z.literal(true).optional(),
  tags: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const PersonaCountAggregateInputObjectSchema: z.ZodType<Prisma.PersonaCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.PersonaCountAggregateInputType>;
export const PersonaCountAggregateInputObjectZodSchema = makeSchema();
