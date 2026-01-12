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
export const AgricultureResourceCategoryMaxAggregateInputObjectSchema: z.ZodType<Prisma.AgricultureResourceCategoryMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureResourceCategoryMaxAggregateInputType>;
export const AgricultureResourceCategoryMaxAggregateInputObjectZodSchema = makeSchema();
