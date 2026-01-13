import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  slug: z.literal(true).optional(),
  title: z.literal(true).optional(),
  description: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const AgricultureResourceCategoryMinAggregateInputObjectSchema: z.ZodType<Prisma.AgricultureResourceCategoryMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureResourceCategoryMinAggregateInputType>;
export const AgricultureResourceCategoryMinAggregateInputObjectZodSchema = makeSchema();
