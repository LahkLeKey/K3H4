import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  targetType: z.literal(true).optional(),
  targetId: z.literal(true).optional(),
  targetLabel: z.literal(true).optional(),
  description: z.literal(true).optional(),
  metadata: z.literal(true).optional(),
  payload: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const AiInsightCountAggregateInputObjectSchema: z.ZodType<Prisma.AiInsightCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.AiInsightCountAggregateInputType>;
export const AiInsightCountAggregateInputObjectZodSchema = makeSchema();
