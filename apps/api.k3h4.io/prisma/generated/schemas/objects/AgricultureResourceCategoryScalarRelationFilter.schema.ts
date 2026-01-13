import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureResourceCategoryWhereInputObjectSchema as AgricultureResourceCategoryWhereInputObjectSchema } from './AgricultureResourceCategoryWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => AgricultureResourceCategoryWhereInputObjectSchema).optional(),
  isNot: z.lazy(() => AgricultureResourceCategoryWhereInputObjectSchema).optional()
}).strict();
export const AgricultureResourceCategoryScalarRelationFilterObjectSchema: z.ZodType<Prisma.AgricultureResourceCategoryScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureResourceCategoryScalarRelationFilter>;
export const AgricultureResourceCategoryScalarRelationFilterObjectZodSchema = makeSchema();
