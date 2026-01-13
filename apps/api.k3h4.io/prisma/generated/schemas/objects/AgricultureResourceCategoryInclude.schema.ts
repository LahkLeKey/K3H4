import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureResourceFindManySchema as AgricultureResourceFindManySchema } from '../findManyAgricultureResource.schema';
import { AgricultureResourceCategoryCountOutputTypeArgsObjectSchema as AgricultureResourceCategoryCountOutputTypeArgsObjectSchema } from './AgricultureResourceCategoryCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  resources: z.union([z.boolean(), z.lazy(() => AgricultureResourceFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => AgricultureResourceCategoryCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const AgricultureResourceCategoryIncludeObjectSchema: z.ZodType<Prisma.AgricultureResourceCategoryInclude> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureResourceCategoryInclude>;
export const AgricultureResourceCategoryIncludeObjectZodSchema = makeSchema();
