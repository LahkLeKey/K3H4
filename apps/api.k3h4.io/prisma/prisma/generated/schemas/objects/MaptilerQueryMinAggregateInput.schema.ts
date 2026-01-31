import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  actorId: z.literal(true).optional(),
  signature: z.literal(true).optional(),
  kind: z.literal(true).optional(),
  path: z.literal(true).optional(),
  lastUsedAt: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const MaptilerQueryMinAggregateInputObjectSchema: z.ZodType<Prisma.MaptilerQueryMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.MaptilerQueryMinAggregateInputType>;
export const MaptilerQueryMinAggregateInputObjectZodSchema = makeSchema();
