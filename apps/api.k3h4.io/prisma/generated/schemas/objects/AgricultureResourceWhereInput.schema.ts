import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableListFilterObjectSchema as StringNullableListFilterObjectSchema } from './StringNullableListFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { AgricultureResourceCategoryScalarRelationFilterObjectSchema as AgricultureResourceCategoryScalarRelationFilterObjectSchema } from './AgricultureResourceCategoryScalarRelationFilter.schema';
import { AgricultureResourceCategoryWhereInputObjectSchema as AgricultureResourceCategoryWhereInputObjectSchema } from './AgricultureResourceCategoryWhereInput.schema'

const agricultureresourcewhereinputSchema = z.object({
  AND: z.union([z.lazy(() => AgricultureResourceWhereInputObjectSchema), z.lazy(() => AgricultureResourceWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => AgricultureResourceWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => AgricultureResourceWhereInputObjectSchema), z.lazy(() => AgricultureResourceWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  categoryId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  title: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  summary: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  url: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  tags: z.lazy(() => StringNullableListFilterObjectSchema).optional(),
  source: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  category: z.union([z.lazy(() => AgricultureResourceCategoryScalarRelationFilterObjectSchema), z.lazy(() => AgricultureResourceCategoryWhereInputObjectSchema)]).optional()
}).strict();
export const AgricultureResourceWhereInputObjectSchema: z.ZodType<Prisma.AgricultureResourceWhereInput> = agricultureresourcewhereinputSchema as unknown as z.ZodType<Prisma.AgricultureResourceWhereInput>;
export const AgricultureResourceWhereInputObjectZodSchema = agricultureresourcewhereinputSchema;
