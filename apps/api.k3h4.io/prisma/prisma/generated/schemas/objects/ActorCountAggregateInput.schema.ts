import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  label: z.literal(true).optional(),
  type: z.literal(true).optional(),
  note: z.literal(true).optional(),
  source: z.literal(true).optional(),
  metadata: z.literal(true).optional(),
  category: z.literal(true).optional(),
  lastSeenAt: z.literal(true).optional(),
  isGlobal: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const ActorCountAggregateInputObjectSchema: z.ZodType<Prisma.ActorCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ActorCountAggregateInputType>;
export const ActorCountAggregateInputObjectZodSchema = makeSchema();
