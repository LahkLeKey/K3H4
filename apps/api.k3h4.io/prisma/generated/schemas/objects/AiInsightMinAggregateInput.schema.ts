import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  targetType: z.literal(true).optional(),
  targetId: z.literal(true).optional(),
  targetLabel: z.literal(true).optional(),
  description: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const AiInsightMinAggregateInputObjectSchema: z.ZodType<Prisma.AiInsightMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.AiInsightMinAggregateInputType>;
export const AiInsightMinAggregateInputObjectZodSchema = makeSchema();
