import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureResourceCategoryCountOutputTypeSelectObjectSchema as AgricultureResourceCategoryCountOutputTypeSelectObjectSchema } from './AgricultureResourceCategoryCountOutputTypeSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => AgricultureResourceCategoryCountOutputTypeSelectObjectSchema).optional()
}).strict();
export const AgricultureResourceCategoryCountOutputTypeArgsObjectSchema = makeSchema();
export const AgricultureResourceCategoryCountOutputTypeArgsObjectZodSchema = makeSchema();
