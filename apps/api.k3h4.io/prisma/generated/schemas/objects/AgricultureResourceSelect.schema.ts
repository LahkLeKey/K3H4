import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureResourceCategoryArgsObjectSchema as AgricultureResourceCategoryArgsObjectSchema } from './AgricultureResourceCategoryArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  categoryId: z.boolean().optional(),
  category: z.union([z.boolean(), z.lazy(() => AgricultureResourceCategoryArgsObjectSchema)]).optional(),
  title: z.boolean().optional(),
  summary: z.boolean().optional(),
  url: z.boolean().optional(),
  tags: z.boolean().optional(),
  source: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional()
}).strict();
export const AgricultureResourceSelectObjectSchema: z.ZodType<Prisma.AgricultureResourceSelect> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureResourceSelect>;
export const AgricultureResourceSelectObjectZodSchema = makeSchema();
