import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  slug: z.literal(true).optional(),
  title: z.literal(true).optional(),
  description: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const AgricultureResourceCategoryCountAggregateInputObjectSchema: z.ZodType<Prisma.AgricultureResourceCategoryCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureResourceCategoryCountAggregateInputType>;
export const AgricultureResourceCategoryCountAggregateInputObjectZodSchema = makeSchema();
