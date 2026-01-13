import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureResourceSelectObjectSchema as AgricultureResourceSelectObjectSchema } from './AgricultureResourceSelect.schema';
import { AgricultureResourceIncludeObjectSchema as AgricultureResourceIncludeObjectSchema } from './AgricultureResourceInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => AgricultureResourceSelectObjectSchema).optional(),
  include: z.lazy(() => AgricultureResourceIncludeObjectSchema).optional()
}).strict();
export const AgricultureResourceArgsObjectSchema = makeSchema();
export const AgricultureResourceArgsObjectZodSchema = makeSchema();
