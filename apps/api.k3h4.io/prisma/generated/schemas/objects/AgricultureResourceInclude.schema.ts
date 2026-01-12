import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureResourceCategoryArgsObjectSchema as AgricultureResourceCategoryArgsObjectSchema } from './AgricultureResourceCategoryArgs.schema'

const makeSchema = () => z.object({
  category: z.union([z.boolean(), z.lazy(() => AgricultureResourceCategoryArgsObjectSchema)]).optional()
}).strict();
export const AgricultureResourceIncludeObjectSchema: z.ZodType<Prisma.AgricultureResourceInclude> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureResourceInclude>;
export const AgricultureResourceIncludeObjectZodSchema = makeSchema();
