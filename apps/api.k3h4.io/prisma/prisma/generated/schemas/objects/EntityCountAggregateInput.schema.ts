import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  actorId: z.literal(true).optional(),
  kind: z.literal(true).optional(),
  direction: z.literal(true).optional(),
  name: z.literal(true).optional(),
  targetType: z.literal(true).optional(),
  targetId: z.literal(true).optional(),
  source: z.literal(true).optional(),
  metadata: z.literal(true).optional(),
  isGlobal: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const EntityCountAggregateInputObjectSchema: z.ZodType<Prisma.EntityCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.EntityCountAggregateInputType>;
export const EntityCountAggregateInputObjectZodSchema = makeSchema();
