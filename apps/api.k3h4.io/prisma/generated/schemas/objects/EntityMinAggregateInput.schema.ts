import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  actorId: z.literal(true).optional(),
  kind: z.literal(true).optional(),
  name: z.literal(true).optional(),
  targetType: z.literal(true).optional(),
  targetId: z.literal(true).optional(),
  source: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const EntityMinAggregateInputObjectSchema: z.ZodType<Prisma.EntityMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.EntityMinAggregateInputType>;
export const EntityMinAggregateInputObjectZodSchema = makeSchema();
