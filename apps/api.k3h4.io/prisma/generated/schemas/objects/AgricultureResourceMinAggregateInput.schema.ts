import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  categoryId: z.literal(true).optional(),
  title: z.literal(true).optional(),
  summary: z.literal(true).optional(),
  url: z.literal(true).optional(),
  source: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const AgricultureResourceMinAggregateInputObjectSchema: z.ZodType<Prisma.AgricultureResourceMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureResourceMinAggregateInputType>;
export const AgricultureResourceMinAggregateInputObjectZodSchema = makeSchema();
