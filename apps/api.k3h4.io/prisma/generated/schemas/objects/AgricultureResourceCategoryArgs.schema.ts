import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureResourceCategorySelectObjectSchema as AgricultureResourceCategorySelectObjectSchema } from './AgricultureResourceCategorySelect.schema';
import { AgricultureResourceCategoryIncludeObjectSchema as AgricultureResourceCategoryIncludeObjectSchema } from './AgricultureResourceCategoryInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => AgricultureResourceCategorySelectObjectSchema).optional(),
  include: z.lazy(() => AgricultureResourceCategoryIncludeObjectSchema).optional()
}).strict();
export const AgricultureResourceCategoryArgsObjectSchema = makeSchema();
export const AgricultureResourceCategoryArgsObjectZodSchema = makeSchema();
