import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  slug: z.string(),
  title: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const AgricultureResourceCategoryCreateManyInputObjectSchema: z.ZodType<Prisma.AgricultureResourceCategoryCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureResourceCategoryCreateManyInput>;
export const AgricultureResourceCategoryCreateManyInputObjectZodSchema = makeSchema();
